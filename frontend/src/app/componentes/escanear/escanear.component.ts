import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  ViewChild,
} from '@angular/core';
import { CabecalhoComponent } from '../cabecalho/cabecalho.component';
import { VIDEO_CONFIG } from './escanear.const';
import jsQR from 'jsqr';
import { Subject, takeUntil, timer } from 'rxjs';
import { EscanearService } from '../../services/escanear.service';
import { ProdutoService } from '../../services/produto.service';
import { ProdutosBot } from '../../models/produtosBot.model';

@Component({
  selector: 'app-escanear',
  standalone: true,
  templateUrl: './escanear.component.html',
  styleUrl: './escanear.component.css',
  imports: [CabecalhoComponent],
})
export class EscanearComponent implements AfterViewInit, OnDestroy {
  @ViewChild('videoElement') video!: ElementRef<HTMLVideoElement>;
  @ViewChild('canvas', { static: true }) canvas!: ElementRef;

  private videoStream!: MediaStream;
  private readonly config: MediaStreamConstraints =
    structuredClone(VIDEO_CONFIG);

  private readonly destroy$ = new Subject<void>();

  constructor(
    private escanearService: EscanearService,
    private produtoService: ProdutoService
  ) {}

  ngAfterViewInit(): void {
    this.prepararScanner();
  }

  private async prepararScanner(): Promise<void> {
    const disponivel = await this.checarCamera();

    if (disponivel) {
      this.comecarScanner();
    }
  }

  private async comecarScanner(): Promise<void> {
    this.videoStream = await navigator.mediaDevices.getUserMedia(this.config);
    this.video.nativeElement.srcObject = this.videoStream;

    this.verificarFrame();
  }

  private async verificarFrame(): Promise<void> {
    if (this.video.nativeElement) {
      const { clientWidth, clientHeight } = this.video.nativeElement;

      this.canvas.nativeElement.width = clientWidth;
      this.canvas.nativeElement.height = clientHeight;

      const canvas = this.canvas.nativeElement.getContext('2d', {
        willReadFrequently: true,
      }) as CanvasRenderingContext2D;

      canvas.drawImage(
        this.video.nativeElement,
        0,
        0,
        clientWidth,
        clientHeight
      );

      const inversionAttempts = 'dontInvert';

      const imagem = canvas.getImageData(0, 0, clientHeight, clientWidth);
      const qrcode = jsQR(imagem.data, imagem.width, imagem.height, {
        inversionAttempts,
      });

      if (qrcode) {
        const qrcodeFormatado = qrcode.data.replace('?', '%3f');

        console.log('QRCode lido. Aguardando resposta do bot...');

        const produtos: ProdutosBot = await this.escanearService.escanear(
          qrcodeFormatado
        );

        this.produtoService.verificarProdutos(produtos as ProdutosBot);
      } else {
        timer(500)
          .pipe(takeUntil(this.destroy$))
          .subscribe(() => {
            this.verificarFrame();
          });
      }
    }
  }

  private async checarCamera(): Promise<boolean> {
    const permissoesCamera = await navigator.permissions.query({
      name: 'camera',
    } as any);

    const estaOk = permissoesCamera.state !== 'denied';

    const temDispositivoDeMidia = 'mediaDevices' in navigator;
    const temMidiaDeUsuario = 'getUserMedia' in navigator.mediaDevices;

    if (!temDispositivoDeMidia || (estaOk && !temMidiaDeUsuario)) {
      alert('Não foi possível acessar sua câmera. Verifique!');
    }

    return estaOk;
  }

  ngOnDestroy(): void {
    this.videoStream
      .getTracks()
      .forEach((track: MediaStreamTrack) => track.stop());

    this.video = null!;

    this.destroy$.next();
    this.destroy$.complete();
  }
}

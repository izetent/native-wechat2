import type {TurboModule} from 'react-native/Libraries/TurboModule/RCTExport';
import {TurboModuleRegistry, NativeModules} from 'react-native';

export interface Spec extends TurboModule {
  getConstants(): {
    WXSceneSession: number;
    WXSceneTimeline: number;
    WXSceneFavorite: number;
    WXMiniProgramTypeRelease: number;
    WXMiniProgramTypeTest: number;
    WXMiniProgramTypePreview: number;
  };

  registerApp(config: {
    appid: string;
    universalLink?: string;
    log?: boolean;
    logPrefix?: string;
  }): void;

  isWechatInstalled(callback: () => void): void;

  sendAuthRequest(
    request: {
      scope: string;
      state: string;
    },
    callback: () => void,
  ): void;

  shareText(
    request: {
      text: string;
      scene: number;
    },
    callback: () => void,
  ): void;

  shareImage(
    request: {
      src: string;
      scene: number;
    },
    callback: () => void,
  ): void;

  shareVideo(
    request: {
      videoUrl: string;
      videoLowBandUrl?: string;
      title?: string;
      description?: string;
      coverUrl?: string;
      scene: number;
    },
    callback: () => void,
  ): void;

  shareWebpage(
    request: {
      webpageUrl: string;
      title?: string;
      description?: string;
      coverUrl?: string;
      scene: number;
    },
    callback: () => void,
  ): void;

  shareMiniProgram(
    request: {
      webpageUrl: string;
      userName: string;
      path: string;
      title?: string;
      description?: string;
      coverUrl?: string;
      withShareTicket?: boolean;
      miniProgramType: number;
      scene: number;
    },
    callback: () => void,
  ): void;

  requestPayment(
    request: {
      partnerId: string;
      prepayId: string;
      nonceStr: string;
      timeStamp: string;
      sign: string;
      extData?: string;
    },
    callback: () => void,
  ): void;

  requestSubscribeMessage(
    request: {
      templateId: string;
      reserved?: string;
      scene: number;
    },
    callback: () => void,
  ): void;

  launchMiniProgram(
    request: {
      userName: string;
      path: string;
      miniProgramType: number;
    },
    callback: () => void,
  ): void;

  openCustomerService(
    request: {
      corpid: string;
      url: string;
    },
    callback: () => void,
  ): void;

  addListener(eventType: string): void;
  removeListeners(count: number): void;
}

export default TurboModuleRegistry.get<Spec>('Wechat') ||
  (NativeModules.Wechat as Spec);

/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly PUBLIC_API_BASE_URL: string;
  readonly PUBLIC_MERCADO_PAGO_PUBLIC_KEY: string;
  readonly PUBLIC_DEV_MODE: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

interface Window {
  MercadoPago: {
    new (publicKey: string): {
      cardForm: (options: any) => {
        getCardFormData: () => {
          token: string;
          paymentMethodId: string;
          issuerId: string;
          cardholderEmail: string;
          amount: string;
          installments: string;
          identificationType: string;
          identificationNumber: string;
        };
      };
    };
  };
  cartUtils: {
    getCartItems: () => any[];
    getCartSubtotal: () => number;
    clearCart: () => void;
  };
} 
/// <reference types="vite/client" />
interface ImportMetaEnv {
    readonly VITE_PXE_URL: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}
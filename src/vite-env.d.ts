/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_EXPLORE_DIRECTORIES?: string;
  readonly VITE_EXPLORE_CONTENTS?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

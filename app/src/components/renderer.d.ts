
type Data = {
    product_id: string,
    title: string,
    price: string,
    sku: string,
}

export interface IElectronAPI {
  saveFile: (data : Data) => Promise<void>;
  openFile: () => Promise<void>
  readFile: () => Promise<Data>
}

declare global {
  interface Window {
    electronAPI: IElectronAPI,
  }
}
export class ItemDto {
  name: string;
  harga: number;
  qty: number;
  nama: any;
}

export class CheckoutDto {
  item: ItemDto[];
}
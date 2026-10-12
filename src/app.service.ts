import { Injectable } from '@nestjs/common';
import { agent } from 'supertest';
import { CheckoutDto, ItemDto } from './dto/kasir.dto.js';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  getGreeting(name: string): string{
    return `Hello, ${name}!`;
  }
  getAgeCategory(age: number): string {
    if (age <= 0){
      return 'umur tidak terdeteksi';
    }else if (age <= 12){
      return 'kamu adalah anak-anak';
    }else if (age <= 20){
      return 'kamu sudah dewasa';
    }else if (age <= 60){
      return 'kamu sudah tua';  
    }else {
      return 'kamu lansia';
    }
  }

  getBMI(weight: number, height: number): string {
    if (height <= 0 || weight <= 0 ) {  
      return 'Invalid input';
    }
    if(isNaN(weight) || isNaN(height)){
      return 'Invalid input';
    }

    //Calculate BMI
    const bmi = weight / (height * height);
    let category : string = "";
    if (bmi < 18.5) {
      category = 'Underweight';
    } else if (bmi >= 18.5 && bmi < 24.9) {
      category = 'Normal weight';
    } else if (bmi >= 25 && bmi < 29.9) {
      category = 'Overweight';
    } else {
      category = 'Obesity';
    }
    return `Your BMI is ${bmi.toFixed(2)} and you are classified as ${category}.`;
  }
  countLuasBalok(panjang: number, lebar: number): number {
    if (panjang <= 0 || lebar <= 0) {
      throw new Error('panjang dan lebar harus lebih besar dari 0');
    }
    return panjang * lebar;
  }

  countBelahKetupat(d1: number, d2: number, sisi :number):
    {luas : number, keliling : number} {
    if (d1 <= 0 || d2 <= 0) {
      throw new Error('Diagonal harus lebih besar dari 0');
    }
const luas = (d1 * d2) / 2;
const keliling = 4 * sisi;
const result = {
  luas: luas,
  keliling: keliling
};
return result;
  }


//Soal 1(cek bilangan)
getBilangan(angka: number) {
  if (!Number.isInteger(angka) || angka < 1 || angka > 100) {
    return {
      error: 'angka harus bilangan bulat antara 1 sampai 100',
    };
  }

  return {
    angka: angka,
    jenis: angka % 2 === 0 ? 'genap' : 'ganjil',
    kuadrat: angka * angka,
    kelipatanLima: angka % 5 === 0,
  };
}

//soal 2 (konversi suhu)

getkonversiSuhu(nilai: number, dari: string, ke: string) {
  const satuan = ['celsius', 'fahrenheit', 'kelvin'];

  if (!satuan.includes(dari) || !satuan.includes(ke)) {
    return {
      error: 'Satuan harus celsius, fahrenheit, atau kelvin',
    };
  }

  if (dari === ke) {
    return {
      error: 'Satuan asal dan tujuan tidak boleh sama',
    };
  }

  if (dari === 'kelvin' && nilai < 0) {
    return {
      error: 'Nilai kelvin tidak boleh kurang dari 0',
    };
  }

  let celsius: number;

  if (dari === 'celsius') {
    celsius = nilai;
  } else if (dari === 'fahrenheit') {
    celsius = (nilai - 32) * 5 / 9;
  } else {
    celsius = nilai - 273.15;
  }

  let hasil: number;

  if (ke === 'celsius') {
    hasil = celsius;
  } else if (ke === 'fahrenheit') {
    hasil = celsius * 9 / 5 + 32;
  } else {
    hasil = celsius + 273.15;
  }
  hasil = Math.round(hasil * 100) / 100;

  return {
    nilaiAsal: nilai,
    satuanAsal: dari,
    hasil: hasil,
    satuanHasil: ke,
  };
}
//soal 3 (generattor deret bilangan)
getDeret(jenis: string, jumlah: number, urutan: string = 'asc') {
  if (!['ganjil', 'genap', 'kuadrat'].includes(jenis)) {
    return 'Jenis hanya boleh ganjil, genap, atau kuadrat';
  }

  if (!Number.isInteger(jumlah) || jumlah < 1 || jumlah > 20) {
    return 'Jumlah harus bilangan bulat antara 1 sampai 20';
  }

  if (urutan !== 'asc' && urutan !== 'desc') {
    return 'Urutan hanya boleh asc atau desc';
  }

  const data: number[] = [];
  let total = 0;

  for (let i = 1; i <= jumlah; i++) {
    let nilai: number;

    if (jenis === 'ganjil') {
      nilai = 2 * i - 1;
    } else if (jenis === 'genap') {
      nilai = 2 * i;
    } else {
      nilai = i * i;
    }

    data.push(nilai);
    total += nilai;
  }

  if (urutan === 'desc') {
    data.reverse();
  }

  return {
    jenis: jenis,
    jumlah: jumlah,
    data: data,
    total: total
  };
}

//soal 4 (penghitung nilai raport)

hitungNilai(data: any) {
  const nama = data.nama;
  const tugas = data.tugas;
  const uts = data.uts;
  const uas = data.uas;

 
  if (typeof nama !== 'string' || nama.trim() === '') {
    return 'Nama harus diisi';
  }

 
  if (!Array.isArray(tugas) || tugas.length < 1) {
    return 'Tugas harus berupa array dan minimal 1 nilai';
  }

 
  const semuaNilai = [...tugas, uts, uas];

  for (const nilai of semuaNilai) {
    if (typeof nilai !== 'number' || nilai < 0 || nilai > 100) {
      return 'Semua nilai harus angka antara 0 sampai 100';
    }
  }

 
  const totalTugas = tugas.reduce(
    (total: number, nilai: number) => total + nilai,
    0
  );

  const rataTugas = totalTugas / tugas.length;

  const nilaiAkhir =
    (0.3 * rataTugas) +
    (0.3 * uts) +
    (0.4 * uas);

  
  let predikat: string;

  if (nilaiAkhir >= 90) {
    predikat = 'A';
  } else if (nilaiAkhir >= 80) {
    predikat = 'B';
  } else if (nilaiAkhir >= 70) {
    predikat = 'C';
  } else {
    predikat = 'D';
  }

 
  const status = nilaiAkhir >= 75 ? 'Lulus' : 'Remedial';

  return {
    nama: nama.trim(),
    rataTugas: rataTugas,
    nilaiAkhir: nilaiAkhir,
    predikat: predikat,
    status: status
  };
}
//Soal 5 (Kasir)

private readonly diskonMember: Record<string, number> = {
    reguler: 0,
    silver: 0,
    gold: 0
  }

  CO(member: string, metode: string, dto: CheckoutDto) {
    const membar = member.toLocaleLowerCase()
    if (!membar || !(membar in this.diskonMember)) {
      return "Invalid"
    }

    const method = metode.toLowerCase()
    if (!method || !['tunai', 'qris'].includes(method)) {
      return "Invalid"
    }

    this.Items(dto?.item)

    return this.Total(membar, method, dto.item) 
  }

  private Items(items: ItemDto[]) {
    if (!Array.isArray(items) || items.length === 0) {
      return "Invalid"
    }

    if (items.length > 10) {
      return "Invalid"
    }

    for (let i = 0; i < items.length; i++) {
      const item = items[i]
      const index = i + 1

      if (!item || typeof item !== 'object') {
        return `Item ke-${index}: format item tidak valid`;
      }

      if (typeof item.nama !== 'string' || item.nama.trim() === '') {
        return `Item ke-${index}: nama harus string dan tidak boleh kosong`;
      }

      if (typeof item.harga !== 'number' || item.harga <= 0) {
        return `Item ke-${index}: harga harus angka lebih dari 0`;
      }

      if (typeof item.qty !== 'number' || !Number.isInteger(item.qty) || item.qty <= 0) {
        return `Item ke-${index}: qty harus bilangan bulat lebih dari 0`;
      }
    }
  }

  private Total(membar: string, method: string, items: ItemDto[]) {
    let subtotal = 0;
    let totalItem = 0;

    const rincian = items.map((item) => {
      const itemSub = item.harga * item.qty
      subtotal += itemSub
      totalItem += item.qty

      return {
        nama: item.nama,
        harga: item.harga,
        qty: item.qty,
        subtotal: itemSub
      }
    })

    const persen = this.diskonMember[membar]
    const diskon = (subtotal * persen) / 100

    const afterDiskon = subtotal - diskon
    const biayaAdmin = method === 'qris' ? (afterDiskon * 1) / 100 : 0
    
    const total = afterDiskon + biayaAdmin

    return {
      membar,
      method,
      rincian,
      totalItem,
      subtotal, 
      diskon,
      biayaAdmin,
      total,
    };
  }
}
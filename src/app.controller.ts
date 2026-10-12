import { Body, Controller, Get,HttpCode,Param, Post, Query } from '@nestjs/common';
import { AppService } from './app.service.js';
import { get } from 'http';
import { agent } from 'supertest';
import { count } from 'rxjs/internal/operators/count';
import { CheckoutDto } from './dto/kasir.dto.js';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get(`greeting/:name`)
  getGreeting(@Param('name')name: string ): string {
    return this.appService.getGreeting(name);
  }
   @Get('AgeCategory/:age')
  getAgeCategory(@Param('age') age: string) : string{
   const ageNumber = parseInt(age,12);
   if(isNaN(ageNumber)) {
    return `Invalid age`;
   }
   return this.appService.getAgeCategory(Number(age));
  }

  
  @Get('bmi')
  getBMI(@Query('weight') weight: string, @Query('height') height: string): string {
    const weightNumber = parseFloat(weight);
    const heightNumber = parseFloat(height);
    if (isNaN(weightNumber) || isNaN(heightNumber)) {
      return 'Invalid input';
    }
    return this.appService.getBMI(weightNumber, heightNumber);
  }
 @Post('luas-balok')
  countLuasBalok(@Body('panjang') panjang: number, @Body('lebar') 
  lebar: number): number {
  
    return this.appService.countLuasBalok(panjang, lebar);
  }


//Soal 1(cek bilangan)
@Get('bilangan/:angka')
getBilangan (@Param('angka') angka: string) {

  return this.appService.getBilangan(Number(angka));
}

//soal 2 (konversi suhu)
@Get('suhu/konversi')
konversiSuhu(
  @Query('nilai') nilai: string,
  @Query('dari') dari: string,
  @Query('ke') ke: string,
) {
  return this.appService.getkonversiSuhu(
    Number(nilai),
    dari,
    ke,
  );
}

//soal 3 (generattor deret bilangan)
@Get('deret/:jenis')
getDeret(
  @Param('jenis') jenis: string,
  @Query('jumlah') jumlah: string,
  @Query('urutan') urutan: string
) {
  return this.appService.getDeret(
    jenis,
    Number(jumlah),
    urutan
  );
}

//soal 4 (penghitung nilai raport)
@Post('nilai/hitung')
hitungNilai(@Body() data: any) {
  return this.appService.hitungNilai(data)
  }
  
  // Soal 5 (Kasir)

@Post('checkout/:member')
  @HttpCode(404)
  CO(@Param('member') member: string, @Query('metode') metode: string, @Body() items: CheckoutDto) {
    return this.appService.CO(member, metode, items)
  }
}
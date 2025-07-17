export function formatTime(date: string) {
  const options = { year: 'numeric', month: 'long', day: 'numeric' } as const
  return new Date(date).toLocaleDateString('en-US', options)
}

// ?   as const yani BUNLAR  year: 'string', month: 'string', day: 'string' ,DEYIL
// ?  BOYLE GORSUN KI tip  HATA olmasin toLocaleDateString tip hatasi gibi gorebilir bazen    ----->>>   year: 'numeric', month: 'long', day: 'numeric'

//*  UTILS      GENEL YAPI ICIN KULLANILIR  MANTIK BUDUR   GENEL YAPI
//*   COMPOSABLE GIBI GORSENIR ANCAK ONUN GIBI DURUM YONETIMI VE YA PINIA GIBI DURUM YONETIMI DEYILDE  GENEL YAPI ICIN ORTAK ISLEM FAZLA KOD OLMASIN DIYE VASITA-dir

//* utils, genel amaçlı yardımcı fonksiyonların yer aldığı bir dizindir. Bu fonksiyonlar,
//* projede tekrar eden işlemleri tek bir yerden yönetmek ve kod tekrarını azaltmak amacıyla kullanılır.

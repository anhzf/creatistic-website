import absoluteUrl from 'next-absolute-url';

interface Props {
  name: string;
  url: ReturnType<typeof absoluteUrl>;
}

export default function GreetingMail({ name, url }: Props) {
  const ImgUrlObj = new URL(url.origin);
  ImgUrlObj.pathname = '/assets/mail-header.jpeg';

  return (
    <article>
      <img src={ImgUrlObj.toString()} alt="header email creatisticID"/>
      <br/>
      <div>
        <h1>Terima kasih {name}... 👋 telah berlangganan dan bergabung menjadi bagian dari creatistic.id.</h1>
      </div>

      <div>
        Komitmen kami memberikan yang terbaik dalam setiap pesanan anda. Karena motto kami adalah mewujudkan cinta dalam furniture.
        <br/>
        Berlangganan dan bergabung bersama creatistic.id turut menjadi perwujudan cinta produk Indonesia dan pengembangan masyarakat sekitar.
        <br/>
        <br/>
        <blockquote>Creatistic.id bermanfaat bagi masyarakat.</blockquote>
        <br/>
        Tunggu informasi menarik dari kami selanjutnya ya...!
        <br/>
        <hr/>
        Salam hangat dari <a href="https://creatistic.id/">creatistic.id</a>
        <br/>
        <br/>
        <small>
          Merasa tidak berlangganan? silahkan hubungi kami melalui email kami ya...
          <br/>
          <a href="mailto:creatistic.id@gmail.com">creatistic.id@gmail.com</a>
        </small>
      </div>
    </article>
  )
}

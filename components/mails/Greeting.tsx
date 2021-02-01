interface Props {
  name: string;
}

export default function GreetingMail({ name }: Props) {
  return (
    <article>
      <img src="/assets/mail-header.jpeg" alt="header email creatisticID"/>
      <br/>
      <h1>Terimakasih {name} 👋</h1>

      <div>
        <h2>Terimakasih {name}... telah berlangganan dan bergabung menjadi bagian dari creatistic.id.</h2>
      </div>

      <div>
        <h2>
          <br/>
        </h2>
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
        <hr/>
        Salam hangat dari <a href="https://creatistic.id/">creatistic.id</a>
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

interface Props {
  name: string;
}

export default function GreetingMail({ name }: Props) {
  return (
    <main>
      <h1>Terimakasih {name} 👋 telah berlangganan info-info menarik dari kami!</h1>
      <h2>Tunggu informasi menarik dari kami selanjutnya ya...!</h2>
      <hr/>
      <span>Salam hangat dari <a href="https://creatistic.id">Creatistic.ID</a></span>
    </main>
  )
}

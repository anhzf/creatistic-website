import Link from 'next/link'
import tw from 'twin.macro'

const StyledSpan = tw.span`inline-block font-extrabold text-gray-900`

const Brand = () => (
  <Link href="/">
    <a>
      <StyledSpan>Creatistic.id</StyledSpan>
    </a>
  </Link>
)

export default Brand

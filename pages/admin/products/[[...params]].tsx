import { fbs } from 'app/services/firebaseClient';
import MainLayout from 'components/layouts/MainLayout';
import ProductForm from 'components/ui/Admin/ProductForm';
import LoginForm from 'components/ui/LoginForm';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { useAuthState } from 'react-firebase-hooks/auth';

interface ServerProps {
  productId: string | null;
}

export const getServerSideProps: GetServerSideProps<ServerProps> = async function ({ params }) {
  const [productId] = params?.params || [null];

  return {
    props: {
      productId,
    }
  }
}

export default function Admin({ productId }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const [user, loading, error] = useAuthState(fbs.auth);

  return (
    <MainLayout className="gap-8">
      {error && <span className="bg-red-500">{error}</span>}
      {loading ? <span>authenticating...</span>
        : user ? (<>

          {window && (
            <ProductForm
              suppressHydrationWarning
              productId={productId || undefined}
              onSubmit={console.log}
            />
          )}

        </>) : <LoginForm />}
    </MainLayout>
  )
}

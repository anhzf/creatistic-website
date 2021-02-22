import { fbs } from 'app/services/firebaseClient';
import MainLayout from 'components/layouts/MainLayout';
import AddProductForm from 'components/ui/Admin/AddProductForm';
import LoginForm from 'components/ui/LoginForm';
import { useAuthState } from 'react-firebase-hooks/auth';

export default function Admin() {
  const [user, loading, error] = useAuthState(fbs.auth);

  return (
    <MainLayout className="gap-8">
      {error && <span className="bg-red-500">{error}</span>}
      {loading ? <span>Loading...</span>
        : user ? (<>

          <AddProductForm onSubmit={console.log} />

        </>) : <LoginForm />}
    </MainLayout>
  )
}

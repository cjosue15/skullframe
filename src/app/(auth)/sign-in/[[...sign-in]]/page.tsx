import { SignIn } from '@clerk/nextjs';

export default function SignInPage() {
  return (
    <div className='flex h-screen w-screen items-center justify-center'>
      <div className='w-full max-w-sm'>
        <SignIn />
      </div>
    </div>
  );
}

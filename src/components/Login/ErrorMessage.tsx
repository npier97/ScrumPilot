const ErrorMessage = ({ errorMessage }: { errorMessage: string }) => (
  <p className='text-xs text-destructive text-center'>{errorMessage}</p>
);

export default ErrorMessage;

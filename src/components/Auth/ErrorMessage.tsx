const ErrorMessage = ({ errorMessage }: { errorMessage: string }) => (
  <p className='text-xs text-destructive'>{errorMessage}</p>
);

export default ErrorMessage;

const ErrorMessage = ({ errorMessage }: { errorMessage: string }) => {
  return <p className='text-xs text-destructive'>{errorMessage}</p>;
};

export default ErrorMessage;

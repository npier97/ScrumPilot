const ErrorMessage = ({ errorMessage }: { errorMessage: string }) => {
  return <p className='text-xs text-destructive text-center'>{errorMessage}</p>;
};

export default ErrorMessage;

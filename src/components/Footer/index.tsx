import { footerMessage } from '@/messages/footerMessage';

const Footer = () => (
  <footer className='w-full py-10 px-8 bg-blue-600 text-white shadow-lg'>
    <div className='mb-8 flex flex-col justify-center gap-8 md:gap-20 lg:gap-40 md:flex-row md:space-y-0'>
      {footerMessage.map((message) => (
        <div key={`${message.title}`} className='flex flex-col md:max-w-xs'>
          <div className='mb-2 md:mb-4 font-bold'>{message.title}</div>
          {message.content.map((item, index) => (
            <div key={`${message.title}-${index}`} className='text-gray-200'>
              {item}
            </div>
          ))}
        </div>
      ))}
    </div>
    <div className='md:text-center'>
      &copy; {new Date().getFullYear()} Scrum Pilot. All rights reserved.
    </div>
  </footer>
);

export default Footer;

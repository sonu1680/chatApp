const contactContainer = () => {
  return (
    <div className="relative md:w-[35vw] xl:2-[20vw] lg:w-[30vw] bg-[#1b1c24] border-r-2 border-[#2f303b] w-full ">
      <div className="pt-3">
        <div className="flex p-5 justify-start items-center gap-2  ">
          <img
            src="https://img.freepik.com/free-vector/chat-application-logo-template-business-branding-design-vector-chatting-communication-text_53876-140608.jpg?size=338&ext=jpg"
            alt=""
            className="w-36 h-10"
          />
        </div>
      </div>

      <div className="my-5">
        <div className="flex items-center justify-center pr-10 ">
          <Title text="Direct Message"></Title>
        </div>
      </div>

      <div className="my-5">
        <div className="flex items-center justify-center pr-10 ">
          <Title text="Channels"></Title>
        </div>
      </div>
    </div>
  );
};

export default contactContainer;

const Title = ({ text }) => {
  return (
    <h6 className="uppercase tracking-widest text-neutral-400 pl-10 font-light text-opacity-90 text-sm ">
      {text}
    </h6>
  );
};


const SectionTitle = ({ heading, subHeading }) => {
  return (
    <div data-aos="zoom-in" className="mx-auto text-center md:w-4/12 my-16 ">
      <p className="text-yellow-600 dark_mode_text mb-2">--- {subHeading} ---</p>
      <h3 className="text-3xl font-bold uppercase dark_mode_text light_mode_text border-y-4 py-4">{heading}</h3>
    </div>
  );
};

export default SectionTitle;

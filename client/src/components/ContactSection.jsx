import {
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
} from "react-icons/fa";

const ContactSection = () => {
  return (
    <section
      id="contact"
      data-aos="fade-up"
      className="bg-[#f8f6f2] py-16"
    >

      <div className="max-w-7xl mx-auto px-4 sm:px-6">

        <div className="text-center mb-12">

          <p className="uppercase tracking-[4px] text-[#C9A96E] text-xs sm:text-sm">
            Contact Us
          </p>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif mt-3">
            We'd Love To Hear From You
          </h2>

        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          <div className="bg-white rounded-3xl p-8 shadow-lg text-center hover:-translate-y-2 duration-300">

            <FaMapMarkerAlt className="text-4xl text-[#C9A96E] mx-auto mb-5"/>

            <h3 className="font-serif text-2xl mb-3">
              Location
            </h3>

            <p className="text-gray-500">
              Lahore, Pakistan
            </p>

          </div>

          <div className="bg-white rounded-3xl p-8 shadow-lg text-center hover:-translate-y-2 duration-300">

            <FaPhoneAlt className="text-4xl text-[#C9A96E] mx-auto mb-5"/>

            <h3 className="font-serif text-2xl mb-3">
              Phone
            </h3>

            <p className="text-gray-500">
              +92 300 1234567
            </p>

          </div>

          <div className="bg-white rounded-3xl p-8 shadow-lg text-center hover:-translate-y-2 duration-300">

            <FaEnvelope className="text-4xl text-[#C9A96E] mx-auto mb-5"/>

            <h3 className="font-serif text-2xl mb-3">
              Email
            </h3>

            <p className="text-gray-500 break-all">
              support@scentsasia.com
            </p>

          </div>

        </div>

      </div>

    </section>
  );
};

export default ContactSection;
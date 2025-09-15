
import { PLATFROMS_DATA } from './../../data/platfromsData';
const SupportPlatforms = () => {
  return (
     <section className="py-20 pb-30 bg-black">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Supported Platforms
            </h2>
            <p className="text-lg text-zinc-400 max-w-2xl mx-auto">
              We integrate with all major competitive programming platforms to give you a complete performance overview.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-8">
            {PLATFROMS_DATA.map((platform) => (
              <div key={platform.name} className="text-center group">
                <div className="w-20 h-20 mx-auto mb-4 p-4 rounded-2xl bg-zinc-900/50 border border-zinc-800 group-hover:border-zinc-700 transition-all duration-300 group-hover:scale-105 ">
                  <img
                    src={platform.icon}
                    alt={platform.name}
                    className="w-full h-full invert group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <h3 className="text-lg font-semibold text-white">{platform.name}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>
  );
};
export default SupportPlatforms;

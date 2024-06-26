import { Events } from '@/components/home/Events';
import { News } from '@/components/home/News';
import { Services } from '@/components/home/Services';
import { Partners } from '@/components/home/Partners';
import { Slider } from '@/components/home/Slider';
import { Video } from '@/components/home/Video';

const Home = () => {
  return (
    <div className="bg-blueBg">
      <section className="h-full mx-auto section-mb">
        <Slider />
      </section>

      <section className="mb-[60px] section-mb w-full">
        <Events />
      </section>

      <section className="lg:mb-[113px] md:mb-[100px] mb-[60px]">
        <News />
      </section>

      <section className="section-mb ">
        <Video />
      </section>

      <section className="section-mb ">
        <Services />
      </section>

      <section className="section-mb">
        <Partners />
      </section>
    </div>
  );
};

export default Home;

import React, { useState } from "react";
import profilePhoto from "../../assets/images/MKSProfilePhoto.jpeg";
import "./about.css";

const AboutPage = () => {
  // State to manage active tab
  const [activeTab, setActiveTab] = useState("background");

  // Function to handle tab click and update active tab
  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="about-page">
      {/* Main content section */}
      <section className="about-section">
        {/* Introduction */}
        <p>
          Dear Visitor, <br />
          <br />
          If you have logged onto this website of mine, you are perhaps curious
          to know who I am? Why I write these blogs? And whether my interests
          match yours… Alright, so let me then introduce myself to you.
        </p>
        <br />
        <hr />
        <br />
        {/* Tab navigation section */}
        <section className="tab-section">
          {/* Individual tabs */}
          <div
            className={`tab ${activeTab === "background" ? "active" : ""}`}
            onClick={() => handleTabClick("background")}
          >
            Background
          </div>
          <div
            className={`tab ${activeTab === "lifeTransitions" ? "active" : ""}`}
            onClick={() => handleTabClick("lifeTransitions")}
          >
            Life Transitions
          </div>
          <div
            className={`tab ${activeTab === "authorship" ? "active" : ""}`}
            onClick={() => handleTabClick("authorship")}
          >
            Authorship & Achievements
          </div>
          <div
            className={`tab ${activeTab === "pursuits" ? "active" : ""}`}
            onClick={() => handleTabClick("pursuits")}
          >
            Current Pursuits
          </div>
          <div
            className={`tab ${activeTab === "foundation" ? "active" : ""}`}
            onClick={() => handleTabClick("foundation")}
          >
            Foundation & Activities
          </div>
          <div
            className={`tab ${activeTab === "personal" ? "active" : ""}`}
            onClick={() => handleTabClick("personal")}
          >
            Personal Beliefs
          </div>
        </section>
        {/* Render content based on active tab */}
        {activeTab === "background" && (
          <>
            {/* Background content */}
            <h2>Background</h2>
            <p>
              I was born in Tamil Nadu, India. I live now in the city of
              Chennai.
              <br />
              <br />I am an alumnus of{" "}
              <strong>
                Loyola College, Madras University where I graduated with a
                Bachelor Degree in Finance and Commerce
              </strong>{" "}
              back in 1977. Then I qualified as a{" "}
              <strong>Chartered Accountant</strong> from the{" "}
              <strong>Institute of Chartered Accountants of India</strong> in
              1982, joined the corporate rat-race and slowly worked my way up 11
              years on the Indian corporate ladder in such blue-chip companies
              like Wipro, Sundram Fasteners and ITC Ltd.
              <br />
              <br />
              Then, after having earned my spurs, I went away from India in 1993
              to pursue my career as a{" "}
              <strong>specialist in corporate and project finance.</strong>
              <br />
              <br /> In the following 24+ years, I managed to survive the
              fiercely competitive professional world of corporate finance,
              holding many senior positions and handling many challenging
              assignments. I held positions as{" "}
              <strong>
                Group Financial Controller, Finance Director and Chief Financial
                Officer
              </strong>{" "}
              in well-known conglomerates in the Middle East – Bahrain, Kuwait,
              Egypt and Saudi Arabia.
              <br />
              <br /> My professional assignments in the last two decades made my
              lifetime working experience a totally <i>“international”</i> one
              in range and quality. It took me to some 20+ different countries
              across the world in the Middle East, Far-East, Europe, UK and USA.
              That kind of travel I believe has given me{" "}
              <i>“a wide-angle and full-spectrum outlook in life”</i>.
            </p>
          </>
        )}
        {activeTab === "lifeTransitions" && (
          <>
            <h2>Life Transitions</h2>
            <p>
              IN 2020, at the peak of the Covid pandemic, I decided to finally
              return home, once and for all, to Chennai after a fairly
              fulfilling professional career abroad. The corporate world I then
              left behind me, and for which I had worked so hard, so long all
              those years, had indeed given me much in life by way of sufficient
              financial reward and freedom that I thought it was the right time
              to move on in life and do something with it that might be equally
              if not more worthwhile.
              <br />
              <br /> My two beloved children, a son and daughter, are themselves
              professionally well-qualified, married and happily engaged in
              their own careers.
              <br />
              <br /> I now live with my wife, Divya, in the sylvan neighborhood
              of Abiramapuram, Chennai, pursuing my other{" "}
              <strong>lifelong interests in life:</strong> Indian philosophy,
              history, English literature, Carnatic music, travelling for fun
              and pilgrimage, reading, writing, reflecting and blogging.
            </p>
          </>
        )}
        {activeTab === "authorship" && (
          <>
            <h2>Authorship & Achievements</h2>
            <p>
              Despite my professional preoccupations, my first passion had for
              many years always been writing.
              <br />
              <br /> In my university days, I was editor of the Loyola College
              campus-magazine <i>“LookOut”</i>. Between 1974-76, I used to be
              the Madras stringer for the <strong>Times of India</strong>{" "}
              publication
              <i>“Youth Times”</i> and contributed several features and columns
              regularly to the youth magazine. I also used to contribute
              articles for a small wonderful, city-based coffee-table magazine
              called
              <strong>“ASIDE“</strong>. Thereafter, after I became a finance
              professional, a few of my feature articles I also published in the
              <strong>“Business Standard”</strong> (1995) and{" "}
              <strong>“The New Horizon”</strong>, (an Islamic Banking institute
              magazine based in London). At the same time, several of my
              writings on religion and religious history got also published in{" "}
              <strong>The Hindu</strong>, Chennai, in the late 1990s.
              <br />
              <br /> The urge to keep writing persisted…
              <br />
              <br /> IN 2017, I published my first book{" "}
              <i>“Unusual Essays of an Unknown Sri Vaishnava”</i>, a 700-page
              commemorative volume as personal tribute to the memory of the
              great 11th century CE philosopher, religious and social reformer,
              Sri Ramanujacharya in the year of his millennial anniversary. To
              my surprise, the book was received warmly by 2000+ readers in
              India and abroad!
              <br />
              <br /> Take a look on a YouTube video-link below on the book
              launch event that was held for my book held in April 2017:
              https://video.search.yahoo.com/search/video;_ylt=Awr9Du9OjJdg1sEAZe9XNyoA;_ylu=Y29sbwNncTEEcG9zAzEEdnRpZAMEc2VjA3Nj?p=The+Hindu+book+review+Unusual+Essays+of+an+Unknown+Sri+Vaishnava&fr=mcafee#id=1&vid=47466a8f3722a1a0a9bc5a8f6a46e067&action=view
              <br />
              <br />
              Soon enough, my book also got some some critical attention
              internationally and earned modest, critical praise by the well
              known global book-review literary agency KIRKUS INDIE …<br />
              <br />
              https://www.kirkusreviews.com/book-reviews/mk-sudarshan/unusual-essays-unknown-sri-vaishnava/{" "}
              <br />
              <br />
              And in the very same year, the book was exhibited at a few
              <strong>International Book Fairs</strong> in Frankfurt, London,
              Denver, Beijing, Singapore and Sharjah.
              <br />
              <br /> The book also earned critical acclaim in the South Indian
              press as well.
              <br />
              <br />
              https://www.thehindu.com/books/books-reviews/rituals-associated-with-vaishnavism/article19464016.ece
              <br />
              <br />
              But what made me feel proud, was that the book, which was
              essentially inspired by the ancient school of Indian school of
              philosophy called
              <strong>Vedanta</strong> earned notice, acceptance and kind
              appreciation from the presiding Pontiffs of the 3 principal
              Vedantic <i>mathams</i> in India viz.{" "}
              <strong>
                His Holiness Srimad Azhagiyasingar of Ahobila Mutt and His
                Holiness Sri Sankaracharya of Sringeri Mutt
              </strong>{" "}
              as well as blessings from{" "}
              <strong>the Pejawar Mutt Swami-ji</strong> in Udupi. Very soon,
              thanks to them, my book received handsome reviews in the
              house-magazines of both the Ahobila Mutt and the Sringeri Mutt,
              <br />
              <br />
              The <strong>second edition of my book</strong>, slightly revised
              and condensed, was republished under the same title in 2 separate
              and attractively priced volumes by another publisher in India —
              <strong>StoryMirror, New Delhi</strong>. It was launched in 2018
              to commemorate the <strong>750th birth anniversary</strong> of the
              great Sri Vaishnavite philosopher-poet and preceptor,{" "}
              <strong>Swami Vedanta Desika</strong>.<br />
              <br /> Looking back on my experience of publishing a book, I am
              left feeling that living my life as I have done… as a child of the
              20th-21st century CE … it’s been very humbling to have had a
              remarkable coincidence happening in my lifetime: that I was able
              to offer tribute on these two grand occasions, one millennial and
              the other nearly so, to two towering Sri Vaishnava Acharyas in
              history and that too in my own personal and rather special way.
              <br />
              <br /> Well… I am not shy of saying this: I am today a writer.
              <br />
              <br /> In 2022 I published my second book, “THE NONDESCRIPT GOD:
              Abstraction or Paragon” on the salient difference between Advaita
              and Visishtaadvaita metaphysics based on my understanding of the
              work, “SATADUSHANI” of Sri Vedanta Desika and the SRI VISHNU
              SAHASRANAMAM. The book received acclaim from scholars of the Sri
              Ahobila Mattam as well as the press. At a book-launch event
              presided over by the{" "}
              <strong>
                46th Azhagiyasingar Sri Ranganatha Yatindra Mahadesikan{" "}
              </strong>
              , the book was blessed by His Holiness himself.
              <br />
              <br /> More details of the second published book can be accessed
              here https://unknownsrivaishnava.in/ <br />
              <br />
              Meanwhile, to keep my writing skills well-honed and to keep
              maintaining some sort of contact and continual engagement with my
              readership both in India and worldwide, I have chosen to write
              blogs and articles on a variety of subjects of interest to me and
              share
              <strong>“thoughts and reflections, ideas and ideals”</strong> with
              them on this my own WordPress website.
            </p>
          </>
        )}
        {activeTab === "pursuits" && (
          <>
            <h2>Current Pursuits</h2>
            <p>
              During the Covid Pandemic years 2021-22, I was tasked by the
              Editors of two well-known religious English-language magazines
              published monthly — Sri Ahobila Mutt’s official journal{" "}
              <strong>“Nrisimha Priya”</strong> and{" "}
              <strong>“Vainavan Kural”</strong> — to translate from the Tamil
              the epistles and public discourses (<strong>“arul mozhi”</strong>)
              that were themselves penned, published or delivered back during
              the 1970s and 1980s by{" "}
              <strong>
                HH Srimadh Azhagiyasingar, the 44th Jeeyar of Sri Ahobila Mutt
              </strong>
              . My translations were published as a regular series in both the
              magazines through 2021-23.
              <br />
              <br /> Those serialised English translations of mine have now in
              June 2023 been all compiled and published as a handsome book
              titled “Epistles of a Prolific Pontiff”.
              <br />
              <br /> The book was released on June 23 , 2023 in the presence of
              the present pontiff (Azhagiyasingar) of Sri Ahobila Muttam ,
              Srimad Ranganatha Yathindra Mahadesikan.
              <br />
              <br /> Throughout the pandemic years , I had also been working on
              another book whose subject had for a very long time been close to
              my heart : the history of the Sri Vaishnava community in the 2nd
              millennium since Sri Ramanujacharya’s times. That book took more
              than 9 months to research and write. It was completed and
              published on July 1, 2023 in the USA and for which the well-known
              Hindutva scholar and author{" "}
              <strong>Sri. Aravindan Neelakandan</strong> (who Co-authored the
              best selling book “BREAKING INDIA” with Rajiv Malhotra) has
              written a Foreword.
              <br />
              <br /> I have a few more personal literary-frontiers to conquer in
              my journey of life: I am working diligently on a{" "}
              <i>‘religious novel’</i> which might take me, who knows, some
              years to unwrap! But then, one day I do hope to see the novel
              through too before I bid goodbye to this world…
            </p>
          </>
        )}
        {activeTab === "foundation" && (
          <>
            <h2>Foundation & Activities</h2>
            <p>
              Oh, and by the way, I must also tell you that in pursuit of my
              deep interest in classical Carnatic Music of India , I also take
              my job seriously as the Managing Trustee of the{" "}
              <strong>Dr. Mrs Mani Krishnaswami Foundation</strong>, a
              charitable Trust founded in memory of my departed mother,{" "}
              <i>Sangitha Kalanidhi</i> <strong>Smt. Mani Krishnaswami</strong>{" "}
              and father <strong>M.Krishnaswami</strong>. Through the activities
              of the Foundation, I actively engage in causes, big and small,
              promoting and nurturing talent and vidwath in classical music and
              fine arts in Chennai, Bangalore and Mangalore.
              <br />
              <br /> The activities of the Smt. Mani Krishnaswami Foundation can
              be viewed on my YouTube channel
              <br />
              <br /> https://youtube.com/@shanmadabushi2462 Sangita Kalanidhi
              Dr. Smt. Mani Krishnaswami (1930-2002)
              <br />
              <br /> And of course, I am fairly active too on social media. On
              <strong>Facebook</strong> I have a page which you can easily
              search if you type in <strong>“Unknown Sri Vaishnava”</strong> or{" "}
              <strong>“Sudarshan Madabushi”</strong>. I like to believe I have a
              loyal and enthusiastic Facebook public following of nearly 200
              members.
            </p>
          </>
        )}
        {activeTab === "personal" && (
          <>
            <h2>Personal Beliefs</h2>
            <p>
              Finally, let me say this: I like to think of myself as{" "}
              <i>“a very, very Indian citizen of the world”</i> for these pretty
              good reasons: <br />
              <br />
              <ul>
                <li>
                  having been born into an{" "}
                  <strong>
                    orthodox Sri Vaishnava family in Tirupati, India
                  </strong>
                  , I can trace my ancestry to the maternal uncle of Sri
                  Ramanujacharya, <i>Sri Tirumalai Nambi</i>;
                </li>
                <li>
                  all the education I have received in life was given me by{" "}
                  <strong>Christian</strong> institutions;
                </li>
                <li>
                  much of my professional career was advanced thanks mainly, in
                  fact, to the many multinational corporates in the{" "}
                  <strong>Islamic world</strong> that I served;
                </li>
                <li>
                  many of my closest <strong>friends in life</strong> are
                  scattered worldwide and they are of diverse race and
                  background;
                </li>
                <li>
                  and if today I have true and genuine respect for{" "}
                  <strong>inter-faith kinship</strong> it is because of the
                  several happy inter-faith happy marriages that have taken
                  place within both my close and extended families.
                </li>
              </ul>
            </p>
          </>
        )}
        <br />
        <hr />
        <br />
        {/* Closing message */}
        <p>
          Let me thus finally sign off with this little message to you: ALL THE
          WORLD TO ME IS TRULY JUST ONE BIG FAMILY!
          <br />
          <br /> <strong> Sudarshan Madabushi </strong>
        </p>
      </section>
      {/* Author section */}
      <section className="author-section">
        {/* Display author's photo */}
        <div className="author-photo">
          <img src={profilePhoto} alt="Author" />
        </div>
      </section>
    </div>
  );
};

export default AboutPage;

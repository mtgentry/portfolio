<template >
  <ArticleBase v-slot>
      <div>
        <h1>The anti-Trump protests in Los Angeles were even larger than we thought</h1>
      

        <p>Yesterday I went to the Anti-Trump rally that ended in downtown Los Angeles. After the event, the LAPD estimated the crowd size to be around 8,000 people.</p>

<p>That figure was not questioned by any major news source. The LA Times, Wall Street Journal, CNN, ABC and many others, all cited it. Only the New York Times did not.</p>

<p>Having seen the crowd with my own eyes, I thought it was larger than 8,000 people. I reached out to LAPD to find out how they got this figure and Officer Tony IM said: “It’s not an exact science, it’s a guess based on observations from our helicopters in the air and officers on the ground.”</p>

<p>That meant their estimate was based solely on who was flying that day, if they were good at estimating crowds, and if they were biased about the election results.</p>

<p>I wanted a more exact number.</p>


<p>FINDING SOURCE FOOTAGE</p>


<p>The protest stretched many blocks down Wilshire Bvld and ended on the steps of the federal building downtown. Close up footage at one location wouldn’t be useful, but I did find this great panning shot on YouTube from a user named David Baca. When stitched together, the footage shows the entire length of the protest all the way down Wilshire.</p>


<p>Using buildings as reference points, together with Google Maps, I was able to determine that the crowd spanned from half a block east of Lucas Ave., all the way down to Westlake Ave, near MacArthur Park.</p>

<img :src="`/images/wilshire_footage.jpg`" />
<p class="caption">A caption.</p>

<p>In the full-sized image you can see what appears to be a car moving north on Westlake Ave, (just under that red dot) that’s how I decided this was the point where the protest ended. Everything on the street east of that car is filled with protestors.</p>


<p>THE JACOBS METHOD OF CROWD ESTIMATION</p>

<p>Originally I was going to slice up the image and use Amazon’s Mechanical Turk to count the protestors. This would have worked fine for the foreground, but the people in the distance were very blurry.</p>

<p>So I did some research and discovered “The Jacobs’ Method” of crowd estimation.</p>

<p>Herbert Jacobs was a professor in the 1960s at UC Berkeley. Being at Cal during the Vietnam War, exposed him to many protests outside his office window. He was curious about the size of these crowds, which led him to come up with a simple formula. It states that in a super dense crowd (like a mosh pit), one person takes up about 2.5 square feet. A moderate crowd is one person per 4.5 sq feet. A light crowd is one person per 10 sq feet.</p>

<p>With this formula in mind, I set out to find some dimensions of my crowd.</p>

<p>CROWD LENGTH</p>

<p>The protestors started in MacArthur Park. By the time David shot his footage, the crowd had reached the front of his building. The tail end of the protest was around Westlake Ave, just a couple blocks east of the park. With this in mind, I used Google Maps to calculate the distance from David’s building to the end of the protest. It was 3,570 feet, almost 3/4 of a mile.</p>

<img :src="`/images/wilshire_crowd_distance.jpg`" />
<p class="caption">A caption.</p>

<p>There’s a slight scattering of protestors between Witmer and Lucas, and also at the intersection of Witmer and Wilshire. Also as you can see in the full-sized image, there were very few cars parked on the street which was helpful in determining the crowd size. Besides these points, the density of the crowd looks fairly consistent.</p>


<p>STREET WIDTH</p>

<p>Street width was easy to determine. I used Google Maps to measure the distance from curb to curb at 6 intersections. The average was 55.94’. I decided to not include the sidewalk. While I recalled seeing a few protestors there, most were onlookers from the builders, so I decided to not count them.</p>


<img :src="`/images/wilshire_street_width.jpg`" />
<p class="caption">A caption.</p>

<p>THE FINAL VERDICT</p>

<p>3,570′ multiplied by 55.95’ = 199,741.5 sq ft. Given a medium density crowd (1 person for every 4.5 sq feet) that would give us a crowd size of about 44,386 people.</p>

<p>However, the sample size has a few light patches of people here and there. And while the tail end near Westlake looks dense from the camera’s point of view, crowds tend to trail off near the end.</p>


<p>40k just seems like a lot. I wish there were more camera angles to validate that amount. If we were to use the “light” formula (1 person for each 10 sq feet), that would get us to 20,000 people. I’d guess the actual number is somewhere in between. Whatever the amount, it’s much more than the LAPD’s estimate of 8,000.</p>


<p>So who cares how big the crowd is? 8,000 is a decent enough turnout, right? That’s true, but hearing that number on the news isn’t likely to catch your attention. But 20,000? 40,000? That’s impressive. And it’s a better indicator of how many people were upset over last weeks election.</p>

<p>I would argue that any government agency has an inherent bias to under-report the size of a protest like this. A larger than normal protest implies that things aren’t quite right. And that perception can threaten the status quo.</p>

<p>Ideally, an independent entity like a non-profit or news organization would measure these protests. I realize that news organizations are hemorrhaging money at the moment so they don’t have a budget for some kind of dedicated protest analyst. But it would be relatively straightforward for an enterprising programmer to create a camera that counts in real time the number of people passing by. At the LA protest yesterday there were dozens of photographers. We could spare at least one of them to stand by a modified camera that tallied passersby, making us less reliant on the possible bias of government officials.</p>



      </div>
  </ArticleBase>
</template>


<script>
export default {
  data() {
    return {
      link1: 'https://superhi.plus/?utm_source=designbynumbers.beehiiv.com&utm_medium=newsletter&utm_campaign=only-be-creative-with-one-big-thing',
      link2: 'https://www.example2.com'
    };
  }
}
</script>


<script>
export default {
  data() {
    return {
      items: [
        { id: 1, text: 'Interactivity' },
        { id: 2, text: 'Storytelling' },
        { id: 3, text: 'Art Direction' },
        { id: 3, text: '3D' },
        { id: 3, text: 'Video' },
        { id: 3, text: 'Color' },
         { id: 3, text: 'Animation' },
      ],
    };
  },
};
</script>



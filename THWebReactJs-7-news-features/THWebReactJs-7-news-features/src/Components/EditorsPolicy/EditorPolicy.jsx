import React, { useState, useEffect } from "react";

import "./policy.scss";

function EditorPolicy() {
  const [policy, setPolicy] = useState([
    "1. You can not pay to have your cafe, shop, restaurant, bar, concept listed on thehuntr.com, or any of our social channels. We do not run or accept paid posts.",
    "2. We are passionate about spotlighting the best places to eat and drink and the best things to see and do in Dubai and the UAE. We especially love to support homegrown businesses.",
    "3. We do accept invitations to dine, stay, experience or visit. However, we do not then feel obliged to paint a pretty picture of a place. We present it as we see it, and if it is bad - we do not run it on thehuntr.com at all. We also always visit a place incognito, either before or after an accepted invitation, to ensure that the standards are consistent. ",
    "4. We do not publish negative reviews. We see it as a waste of time for us, the business, and the community. We send constructive feedback privately if we have a bad experience and we do not run it on these pages or across our social platforms. This means that you can explore thehuntr.com safe in the knowledge that every place listed has our seal of approval.",
    "5. You can not pay to have your cafe, shop, restaurant, bar, concept listed on thehuntr.com, or any of our social channels. We do not run or accept paid posts.",
    "6. We are passionate about spotlighting the best places to eat and drink and the best things to see and do in Dubai and the UAE. We especially love to support homegrown businesses.",
    "7. We do accept invitations to dine, stay, experience or visit. However, we do not then feel obliged to paint a pretty picture of a place. We present it as we see it, and if it is bad - we do not run it on thehuntr.com at all. We also always visit a place incognito, either before or after an accepted invitation, to ensure that the standards are consistent. ",
    "8. We do not publish negative reviews. We see it as a waste of time for us, the business, and the community. We send constructive feedback privately if we have a bad experience and we do not run it on these pages or across our social platforms. This means that you can explore thehuntr.com safe in the knowledge that every place listed has our seal of approval.",
  ]);

  // split data
  const half = Math.ceil(policy.length / 2);

  const firstHalf = policy.splice(0, half);
  const secondHalf = policy.splice(-half);

  return (
    <main className="policy-comp-container">
      <h1>THE HUNTR'S EDITORIAL POLICY</h1>
      <section>
        <div>
          {firstHalf.map((v, i) => {
            return <p>{v}</p>;
          })}
        </div>
        <div>
          {secondHalf.map((v, i) => {
            return <p>{v}</p>;
          })}
        </div>
      </section>
    </main>
  );
}

export default EditorPolicy
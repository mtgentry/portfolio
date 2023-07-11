<template>
  <div class="plan-container">
    <div class="plan" id="monthly">
      <h2>Monthly</h2>
      <p class="subhead">Pause or cancel anytime.</p>
      <div class="price">
        <span class="currency">$</span>
        <span class="amount">4,995</span>
        <span class="period">/month</span>
      </div>
      <h3>What's included</h3>
      <ul>
        <li>One request at a time</li>
        <li>Unlimited users</li>
        <li>No minimum commitment</li>
        <li>Easy credit card payments</li>
        <li>Pause or cancel anytime</li> 
        
      </ul>
      <a :href="url1" class="plan-button">Get Started</a>
    </div>
    <div class="plan" id="monthly">
      <h2>Quarterly</h2>
      <p class="subhead">Save $500 per month.</p>
      <div class="price">
        <span class="currency">$</span>
        <span class="amount">4,495</span>
        <span class="period">/month</span>
      </div>
      <h3>What's included</h3>
      <ul>
        <li>One request at a time</li>
        <li>Unlimited users</li>
        <li>No minimum commitment</li>
        <li>Easy credit card payments</li>
        <li>Pause or cancel anytime</li>
      </ul>
      <a :href="url2" class="plan-button">Get Started</a>
    </div>

    <div class="plan" id="monthly">
      <h2>Yearly</h2>
      <p class="subhead">Save $1,000/month.</p>
      <div class="price">
        <span class="currency">$</span>
        <span class="amount">3,995</span>
        <span class="period">/month</span>
      </div>
      <h3>What's included</h3>
      <ul>
        <li>One request at a time</li>
        <li>Unlimited users</li>
        <li>No minimum commitment</li>
        <li>Easy credit card payments</li>
        <li>Pause or cancel anytime</li>
      </ul>
      <a :href="url3" class="plan-button">Contact Us</a>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      url1: 'https://buy.stripe.com/28o5nvc5Y74W4YEbIK', 
       url2: 'https://buy.stripe.com/5kAdU1fiaexodva4gj',
        url3: ''
    }
  }
}
</script>









<style scoped>
.subheader-text {
  font-size: 16px;
  max-width: 900px;
  text-align: center;
  margin-bottom: 30px;
}

.subhead {
  font-size: 14px;
  max-width: 900px;
  text-align: left;
  margin-bottom: 30px;
  margin-top:5px;
}

.plan-container {
  display: flex;
  justify-content: space-between;
  max-width: 691px;
  gap: 10px;
  justify-content: center;
}

.plan {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
  min-width: 211px;
  max-width: 211px;
  height: auto;
  background: white;
  padding: 12px 19px 20px 19px;
  box-sizing: border-box;
  border-radius: 7px;
  color: #282725;
}

.plan h2 {
  font-size: 30px;
  margin-top: -5px;
  margin-bottom:3px;
}

.plan h3 {
  margin-bottom:0px;
  font-size: 14px;
}

.plan p {
  font-size: 15px;
  line-height: 130%;
}

.plan ul {
  list-style-position: inside;
  padding-left: 0;
  margin-bottom:20px;
}

.plan li {
  text-align: left;
  line-height: 1.5;
  font-size: 13px;
}

.price {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin-bottom: 30px;
}

.amount {
  display: flex;
  align-items: flex-start;
  font-size: 27px;
  margin-right: 10px;
  line-height: 1px;
  font-weight: 600;
}

.currency {
  font-size: 18px;
  align-self: flex-start;
  margin-top:-5px;
  font-weight: 600;
  margin-right:2px;
}

.period {
  font-size: 14px;
  align-self: flex-end;
  margin-bottom:-5px;
  margin-left: -7px;
}

.plan-button {
  display: inline-block;
  width: 181px;
  max-width: 100%;
  height: 44px;

  font-size: 17px;
  text-decoration: none;
border: 1px solid #282725;
  border-radius: 22px;
  text-align: center;
  align-self: center;
  line-height: 41px; 
}

@media (max-width: 768px) {
  .plan-container {
    flex-direction: column;
    gap: 20px;
  }
}

</style>

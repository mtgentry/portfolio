<template>

<body>
   
    <div class="plan-container">
        <div class="plan" id="monthly">
            <h2>Monthly</h2>
            <p class="subhead">No minimum commitment. Pause or cancel anytime.</p>
            <div class="price">
                <span class="currency">$</span>
                <span class="amount">4,995</span>
                <span class="period">/month</span>
            </div>
            <h3>What's included</h3>
            <ul>
                <li>Lorem Ipsum dolor</li>
                <li>Lorem Ipsum dolor</li>
                <li>Lorem Ipsum dolor</li>
                <li>Lorem Ipsum dolor</li>
                <li>Lorem Ipsum dolor</li>
            </ul>
            <button>Get started</button>
        </div>
        <div class="plan" id="quarterly">
            <h2>Quarterly</h2>
            <p class="subhead">No minimum commitment. Pause or cancel anytime.</p>
            <div class="price">
                <span class="currency">$</span>
                <span class="amount">4,995</span>
                <span class="period">/month</span>
            </div>
            <h3>What's included</h3>
            <ul>
                <li>Lorem Ipsum dolor</li>
                <li>Lorem Ipsum dolor</li>
                <li>Lorem Ipsum dolor</li>
                <li>Lorem Ipsum dolor</li>
                <li>Lorem Ipsum dolor</li>
            </ul>
            <button>Get started</button>
        </div>
        <div class="plan" id="yearly">
            <h2>Yearly</h2>
            <p class="subhead">No minimum commitment. Pause or cancel anytime.</p>
            <div class="price">
                <span class="currency">$</span>
                <span class="amount">4,995</span>
                <span class="period">/month</span>
            </div>
            <h3>What's included</h3>
            <ul>
                <li>Lorem Ipsum dolor</li>
                <li>Lorem Ipsum dolor</li>
                <li>Lorem Ipsum dolor</li>
                <li>Lorem Ipsum dolor</li>
                <li>Lorem Ipsum dolor</li>
            </ul>
            <button>Get started</button>
        </div>
    </div>
</body>



</template>

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
    border:1px solid #ff0000;
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
    padding: 20px 20px 20px;
    box-sizing: border-box;
    border-radius: 7px;
    color: #282725;
    border: 1px solid blue;
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
    font-size: 16px;
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

.plan button {
    width: 232px;
    max-width: 100%;
    height: 44px;
    background: #2805FF;
    color: white;
    font-size: 17px;
    border: none;
    border-radius: 22px;
    text-align: center;
    align-self: center;
    padding-bottom:5px;
}

@media (max-width: 768px) {
    .plan-container {
        flex-direction: column;
        gap: 20px;
    }
}


</style>

<script setup>
</script>

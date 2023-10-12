<template>
  <div class="plan-container">
   
  
     <a :href="url1" class="plan-button">Book a Free Call</a>

    
  </div>
</template>

<script>
export default {
  data() {
    return {
      url1: 'https://calendly.com/hoopladesign/30min'
       
        
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
  padding: 20px 20px 20px;
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

.plan-button {
  display: inline-block;
  width: 250px;
  max-width: 100%;
  height: 50px;
  background: #2805FF;
  color: #fff !important; 
  font-size: 19px;
  text-decoration: none;
  border: none;
  border-radius: 25px;
  text-align: center;
  align-self: center;
  padding-bottom:5px;
  line-height: 46px;
}

@media (max-width: 768px) {
  .plan-container {
    flex-direction: column;
    gap: 20px;
  }
}

</style>

<template lang="pug">
  v-container(fluid)
    v-row
      v-col(cols="12" md="3")
        v-navigation-drawer.sidebar(permanent app)
          nav.nav-wrapper
            ul.nav-list
              li(
                v-for="(item, i) in sections"
                :key="i"
              )
                a(@click="scrollTo(item.id)") {{ item.title }}
                ul.nav-sublist(v-if="item.subsections")
                  li(
                    v-for="(sub, j) in item.subsections"
                    :key="j"
                  )
                    a.subsection(@click="scrollTo(sub.id)") {{ sub.title }}

      v-col(cols="12" md="9")
        v-container.content-area
          h1.display-1.mb-6 House Agreement

          section#ownership.mb-8
            h2.mb-4 Ownership & Equity Structure

            div#legacy.mb-4
              h3.mb-2 The "Legacy" Equity (50/50)
              p We agree that as of today, the existing equity (Market Value minus Mortgage Balance) is owned 50/50. This "Pot A" remains a fixed equal split.

            div#investment
              h3.mb-2 The "Investment" Equity (Contribution-Based)
              p Any future equity created by mortgage principal pay-down or market appreciation from this date forward ("Pot B") will be split proportionally. If you pay 20% of the total principal over the next 5 years, you own 20% of the "Pot B" growth.

          section#financial.mb-8
            h2.mb-4 Monthly Financial Operations

            div#mortgage.mb-4
              h3.mb-2 Mortgage & Carrying Costs
              p The resident (Wife) is responsible for ensuring the full mortgage, taxes, and insurance are paid.

            div#contributions.mb-4
              h3.mb-2 Varying Contributions & Notice
              p The non-resident (You) may contribute a varying amount each month. You must provide 10 days' notice of your intended contribution. If you contribute $0, your "Pot B" equity share simply does not grow for that month.

            div#maintenance
              h3.mb-2 Maintenance vs. Major Repairs
              p The resident covers 100% of utilities and routine maintenance (repairs under $500). Major structural repairs (roof, HVAC) are split 50/50 to protect the asset.

          section#improvements.mb-8
            h2.mb-4 Property Improvements

            div#credits.mb-4
              h3.mb-2 Capital Improvement Credits
              p If the resident funds an upgrade (e.g., bathroom remodel), she is entitled to a Dollar-for-Dollar Credit.

            div#documentation
              h3.mb-2 Documentation (The "Receipts" Rule)
              p All receipts for upgrades must be saved in a shared digital folder. These costs are reimbursed to the payer from the house proceeds before the final equity split.

          section#occupancy.mb-8
            h2.mb-4 Occupancy & Future Use

            div#resident-rights.mb-4
              h3.mb-2 Primary Resident Rights
              p The resident has the right to "quiet enjoyment" and autonomy over the home's daily use.

            div#reciprocal
              h3.mb-2 Reciprocal Right of Occupancy
              p The non-resident may elect to move into the home with 6 months' written notice. The current resident then has the choice to swap roles, trigger a buyout of the other party, or sell the home.

          section#exit.mb-8
            h2.mb-4 The 5-Year Exit Strategy

            div#refinance.mb-4
              h3.mb-2 Refinance & Buyout Options
              p At the 5-year mark, we will evaluate a refinance to remove the non-resident from the mortgage or a total buyout/sale.

            div#dti.mb-4
              h3.mb-2 Debt-to-Income (DTI) Protections
              p The resident must pay the mortgage from a sole bank account to provide the 12-month "paper trail" required for the non-resident to qualify for a new home loan.

            div#force-majeure
              h3.mb-2 Force Majeure (Mandatory Sale)
              p If the mortgage is more than 30 days delinquent, the house must be listed for sale immediately to protect both parties' credit scores.
</template>

<script>
export default {
  data() {
    return {
      selectedItem: 0,
      sections: [
        {
          title: 'Ownership & Equity Structure',
          id: 'ownership',
          subsections: [
            { title: 'The "Legacy" Equity (50/50)', id: 'legacy' },
            { title: 'The "Investment" Equity', id: 'investment' }
          ]
        },
        {
          title: 'Monthly Financial Operations',
          id: 'financial',
          subsections: [
            { title: 'Mortgage & Carrying Costs', id: 'mortgage' },
            { title: 'Varying Contributions & Notice', id: 'contributions' },
            { title: 'Maintenance vs. Major Repairs', id: 'maintenance' }
          ]
        },
        {
          title: 'Property Improvements',
          id: 'improvements',
          subsections: [
            { title: 'Capital Improvement Credits', id: 'credits' },
            { title: 'Documentation', id: 'documentation' }
          ]
        },
        {
          title: 'Occupancy & Future Use',
          id: 'occupancy',
          subsections: [
            { title: 'Primary Resident Rights', id: 'resident-rights' },
            { title: 'Reciprocal Right of Occupancy', id: 'reciprocal' }
          ]
        },
        {
          title: 'The 5-Year Exit Strategy',
          id: 'exit',
          subsections: [
            { title: 'Refinance & Buyout Options', id: 'refinance' },
            { title: 'DTI Protections', id: 'dti' },
            { title: 'Force Majeure', id: 'force-majeure' }
          ]
        }
      ]
    }
  },
  head() {
    return {
      link: [
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=EB+Garamond:wght@400;500;600&display=swap'
        }
      ]
    }
  },
  mounted() {
    this.$store.commit('updateState', {field: 'backgroundColor', value: "#F8F7F4"})
  },
  methods: {
    scrollTo(id) {
      const element = document.getElementById(id)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    }
  }
}
</script>

<style lang="sass" scoped>
.sidebar
  position: fixed !important
  top: 64px
  height: calc(100vh - 64px)
  font-family: 'EB Garamond', serif
  background-color: #F8F7F4 !important
  border-right: 1px solid #1D1E20 !important

.nav-wrapper
  padding: 20px

.nav-list
  list-style: none
  padding: 0
  margin: 0

  > li
    margin-bottom: 16px

    > a
      font-size: 18px
      font-weight: 600
      color: #1D1E20
      cursor: pointer
      transition: opacity 0.2s

      &:hover
        opacity: 0.6

.nav-sublist
  list-style: none
  padding-left: 20px
  margin-top: 8px

  > li
    margin-bottom: 8px

    > a
      font-size: 16px
      font-weight: 400
      color: #1D1E20
      cursor: pointer
      transition: opacity 0.2s

      &:hover
        opacity: 0.6

.content-area
  padding: 40px
  max-width: 900px
  font-family: 'EB Garamond', serif

.subsection
  font-size: 0.9em
  color: #1D1E20

section
  scroll-margin-top: 80px

h1
  font-family: 'EB Garamond', serif
  font-size: 48px
  font-weight: 600
  line-height: 1.2
  letter-spacing: -0.5px

  @media (max-width: 768px)
    font-size: 36px

h2
  font-family: 'EB Garamond', serif
  font-size: 32px
  font-weight: 600
  line-height: 1.3
  margin-top: 40px
  letter-spacing: -0.3px

  @media (max-width: 768px)
    font-size: 28px

h3
  font-family: 'EB Garamond', serif
  font-size: 24px
  font-weight: 500
  line-height: 1.4
  letter-spacing: -0.2px

  @media (max-width: 768px)
    font-size: 21px

p
  font-family: 'EB Garamond', serif !important
  font-size: 20px !important
  line-height: 1.7
  color: #1D1E20
  font-weight: 400

  @media (max-width: 768px)
    font-size: 18px !important

h1, h2, h3
  color: #1D1E20

@media (max-width: 960px)
  .sidebar
    display: none
</style>

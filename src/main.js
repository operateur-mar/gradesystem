

const { createApp } = Vue;

createApp({
  data() {
    return {
          tabs: [
        { name: 'tabone', label: 'إضافة الموظفين '},
        { name: 'tabtwo', label: 'الإطلاع على اللائحة' },
        /*{ name: 'Settings', label: 'Settings' }*/
        
      ],
      activeTab: 'Students', 
      users: [], 
      newUser: {
        name: "",
        title: "",
        dateSignIn: "",
        grade:"",
        nextgradedate:"",
        gradingpath: []
       
      }, 
      modalOpen: false,
      modalUser: null,
      }
   
  },
  computed: {
   
  },
  mounted() {
  emailjs.init('QjrWaKpiQc7Wca2Sp'); // Get this from EmailJS dashboard

  },
  methods: {
  
  addUser() {
        if (
          this.newUser.name.trim() &&
          this.newUser.title.trim() &&
          this.newUser.dateSignIn
        ) {
          // convert date: 
          const dateSignIn = new Date(this.newUser.dateSignIn);
          /* ============= SWITCH CASES ============= */
          switch (this.newUser.grade) {
            case "ech6-1":
              this.newUser.gradingpath.push({
                level: " الرتبة 1 ", 
                dateLevel:  this.dateSetter(dateSignIn, 24)
              });
              this.newUser.gradingpath.push({
                level: " الرتبة 2 ", 
                dateLevel:  this.dateSetter(dateSignIn, 36)
              });
              this.newUser.gradingpath.push({
                level: " الرتبة 3 ", 
                dateLevel:  this.dateSetter(dateSignIn, 48)
              });
              this.newUser.gradingpath.push({
                level: " الرتبة 4 ", 
                dateLevel:  this.dateSetter(dateSignIn, 72)
              });
              this.newUser.gradingpath.push({
                level: " الرتبة 5 ", 
                dateLevel:  this.dateSetter(dateSignIn, 96)
              });
                this.newUser.gradingpath.push({
                level: " الرتبة 6 ", 
                dateLevel:  this.dateSetter(dateSignIn, 120)
              });
              this.newUser.gradingpath.push({
                level: " الرتبة 7 ", 
                dateLevel:  this.dateSetter(dateSignIn, 144)
              });
                this.newUser.gradingpath.push({
                level: " الرتبة 7 ", 
                dateLevel:  this.dateSetter(dateSignIn, 180)
              });
              this.newUser.gradingpath.push({
                level: " الرتبة 8 ", 
                dateLevel:  this.dateSetter(dateSignIn, 216)
              });
              this.newUser.gradingpath.push({
                level: " الرتبة 9 ", 
                dateLevel:  this.dateSetter(dateSignIn, 252)
              });
              this.newUser.gradingpath.push({
                level: " الرتبة 10 ", 
                dateLevel:  this.dateSetter(dateSignIn, 288)
              });
              this.newUser.gradingpath.push({
                level: " EXP", 
                dateLevel:  this.dateSetter(dateSignIn, 336)
              });
            
              break;
          }
            /* ============= ./SWITCH CASES ============= */
          this.users.push({ ...this.newUser })
          // Reset form
          this.newUser = { name: "", title: "", dateSignIn: "", expirationDate: "" }
          console.log(this.users);
        } else {
          alert("")
        }

        // reset form
        this.newUser = {
          name: "",
          title: "",
          dateSignIn: "",
          grade: "",
          nextgradedate: "",
          gradingpath: []
        };
      }, 

    // function to handle setting dates
    dateSetter(dateSign, numberofMonths) {
      const DS = new Date(this.newUser.dateSignIn);
      const dateLevel = new Date(DS);
      dateLevel.setMonth(dateLevel.getMonth() + numberofMonths);
      return dateLevel.toISOString().substr(0, 10);;
    }, 

    // Modals Handlers: 
    // ...existing methods...
    openDetails(user) {
      this.modalUser = user;
      this.modalOpen = true;
    },
   closeModal() {
      this.modalOpen = false;
      this.modalUser = null;
   },

   /*EMAIL SENDER*/
   async sendEmail() {
      this.loading = true;
      this.message = '';
      
      try {
        const response = await emailjs.send(
          'service_5oi6z0i',      // Get from EmailJS dashboard
          'template_dcp6w9o',     // Get from EmailJS dashboard
          {
            to_email: 'the.dr.rida@gmail.com',
            from_name: 'نظام الترقية',
            subject: 'إشعار ',
            message: 'رسالة إشعار لتذكيرك بأن الموظف  فلان بن فلان المسجل بتاريخ 12/12/2025 بلغ ترقية في الرتبة بتاريخ 12/12/2027 '
          }
        );
        
        console.log('Email sent successfully!', response);
        this.message = 'Email sent successfully!';
      } catch (error) {
        console.error('Error sending email:', error);
        this.message = 'Failed to send email: ' + error.text;
      } finally {
        this.loading = false;
      }
    }
  
  
}}).mount('#app');

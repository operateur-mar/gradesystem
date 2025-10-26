const { createApp } = Vue;

createApp({
  data() {
    return {
      tabs: [
        { name: 'tabone', label: 'إضافة الموظفين ' },
        { name: 'tabtwo', label: 'الإطلاع على اللائحة' },
      ],
      activeTab: 'Students',
      users: [],
      newUser: {
        name: "",
        title: "",
        dateSignIn: "",
        grade: "",
        nextgradedate: "",
        gradingpath: []
      },
      modalOpen: false,
      modalUser: null,
    };
  },

  mounted() {
    // ✅ Load users from localStorage
    const savedUsers = localStorage.getItem("usersData");
    if (savedUsers) {
      this.users = JSON.parse(savedUsers);
    }

    // init EmailJS
    emailjs.init('QjrWaKpiQc7Wca2Sp');
  },

  watch: {
    // ✅ Watch for changes and save automatically
    users: {
      handler(newValue) {
        localStorage.setItem("usersData", JSON.stringify(newValue));
      },
      deep: true,
    },
  },

  methods: {
    addUser() {
      if (
        this.newUser.name.trim() &&
        this.newUser.title.trim() &&
        this.newUser.dateSignIn
      ) {
        const dateSignIn = new Date(this.newUser.dateSignIn);

        // === SWITCH CASES ===
        switch (this.newUser.grade) {
          case "ech6-1":
            this.newUser.gradingpath.push(
              { level: "الرتبة 1", dateLevel: this.dateSetter(dateSignIn, 0) },
              { level: "الرتبة 2", dateLevel: this.dateSetter(dateSignIn, 24) },
              { level: "الرتبة 3", dateLevel: this.dateSetter(dateSignIn, 36) },
              { level: "الرتبة 4", dateLevel: this.dateSetter(dateSignIn, 48) },
              { level: "الرتبة 5", dateLevel: this.dateSetter(dateSignIn, 72) },
              { level: "الرتبة 6", dateLevel: this.dateSetter(dateSignIn, 96) },
              { level: "الرتبة 7", dateLevel: this.dateSetter(dateSignIn, 120) },
              { level: "الرتبة 8", dateLevel: this.dateSetter(dateSignIn, 144) },
              { level: "الرتبة 9", dateLevel: this.dateSetter(dateSignIn, 180) },
              { level: "الرتبة 10", dateLevel: this.dateSetter(dateSignIn, 216) },
              { level: "الرتبة EXP", dateLevel: this.dateSetter(dateSignIn, 252) },
              //{ level: "EXP", dateLevel: this.dateSetter(dateSignIn, 288) }
            );
            break;
        }

      
        this.users.push({ ...this.newUser });

        // ✅ Automatically saved to localStorage (via watcher)

        // Reset form
        this.newUser = {
          name: "",
          title: "",
          dateSignIn: "",
          grade: "",
          nextgradedate: "",
          gradingpath: []
        };
      } else {
        alert("المرجو ملء جميع الخانات قبل الإضافة");
      }
    },

 
    dateSetter(dateSign, numberofMonths) {
      const DS = new Date(dateSign);
      const dateLevel = new Date(DS);
      dateLevel.setMonth(dateLevel.getMonth() + numberofMonths);
      return dateLevel.toISOString().substr(0, 10);
    },

    deleteuser(index) {
      this.users.splice(index, 1);
    },
    
    openDetails(user) {
      this.modalUser = user;
      this.modalOpen = true;
    },

    closeModal() {
      this.modalOpen = false;
      this.modalUser = null;
    },

    
    clearLocalData() {
      localStorage.removeItem("usersData");
      this.users = [];
    },

    
    async sendEmail() {
      this.loading = true;
      this.message = '';

      try {
        const response = await emailjs.send(
          'service_5oi6z0i',
          'template_dcp6w9o',
          {
            to_email: 'the.dr.rida@gmail.com',
            from_name: 'نظام الترقية',
            subject: 'إشعار',
            message: 'رسالة إشعار لتذكيرك بأن الموظف فلان بن فلان المسجل بتاريخ 12/12/2025 بلغ ترقية في الرتبة بتاريخ 12/12/2027'
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
  }
}).mount('#app');

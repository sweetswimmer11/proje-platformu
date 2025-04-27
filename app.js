// Dosya: app.js

document.addEventListener("DOMContentLoaded", () => {
  // ==== Menü tıklamalarıyla görünürlük kontrolü ====
  const navLinks = document.querySelectorAll(".nav-links a");
  const sections = {
    "Ana Sayfa": "hero",
    "Yarışmalar": "competitions",
    "Etkinlikler": "deadlines",
    "Mentorlar": "mentors",
    "Topluluğum": "community"
  };

  function showSection(id) {
    document.querySelectorAll("main section").forEach(sec => {
      sec.style.display = "none";
    });
    const target = document.getElementById(id);
    if (target) {
      target.style.display = "block";
    }
  }

  showSection("hero");

  navLinks.forEach(link => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      navLinks.forEach(l => l.classList.remove("active"));
      link.classList.add("active");

      const sectionId = sections[link.textContent.trim()];
      if (sectionId) {
        showSection(sectionId);
      }
    });
  });

    // Gerekli DOM elementlerini seç
    const profileSection = document.getElementById("profile-section");
    const recommendedCompetitionsContainer = document.getElementById("recommended-competitions-container");
    const upcomingDeadlinesContainer = document.getElementById("upcoming-deadlines-container");
    const mentorsContainer = document.getElementById("mentors-container");
    const communityPostsContainer = document.getElementById("community-posts-container");
    const notificationList = document.getElementById("notification-list");
    const notificationBtn = document.querySelector(".notification-btn");
    const notificationPanel = document.getElementById("notification-panel");
    const closeNotificationBtn = document.querySelector(".close-btn");
    const markAllReadBtn = document.querySelector(".mark-all-read-btn");
  
    // Kullanıcı profili verisi
    const userProfile = {
      name: "Ali Yılmaz",
      interests: ["Yapay Zeka", "Siber Güvenlik", "Mobil Uygulama"],
      pastCompetitions: ["AI Hackathon 2024", "Siber Güvenlik Yarışması 2024", "TÜBİTAK 2209-A"]
    };
  
    // Profil bölümünü doldur (eğer HTML'de varsa)
    if (profileSection) {
      profileSection.innerHTML = `
        <h2>Profilim</h2>
        <p><strong>İsim:</strong> ${userProfile.name}</p>
        <p><strong>İlgi Alanları:</strong> ${userProfile.interests.join(", ")}</p>
        <p><strong>Katıldığı Yarışmalar:</strong> ${userProfile.pastCompetitions.join(", ")}</p>
      `;
    }
  
    // Önerilen Yarışmalar verisi
    const recommendedCompetitions = [
      {
        id: 1,
        title: "Genç Girişimciler Yarışması",
        category: "Girişimcilik",
        deadline: "2025-05-15",
        description: "Üniversite öğrencilerine yönelik yenilikçi iş fikirlerinin değerlendirildiği yarışma.",
        organizer: "TOBB",
        participants: 324,
        saved: false
      },
      {
        id: 2,
        title: "AI Hackathon 2025",
        category: "Yapay Zeka",
        deadline: "2025-06-10",
        description: "Yapay zeka alanında çalışan öğrencilere yönelik 48 saatlik yazılım geliştirme maratonu.",
        organizer: "Microsoft Türkiye",
        participants: 156,
        saved: true
      },
      {
        id: 3,
        title: "Siber Güvenlik Yarışması",
        category: "Siber Güvenlik",
        deadline: "2025-05-30",
        description: "Siber güvenlik yeteneklerini test etmek isteyen gençler için CTF formatında düzenlenen yarışma.",
        organizer: "TÜBİTAK",
        participants: 245,
        saved: false
      }
    ];
  
    // Önerilen Yarışmalar bölümünü doldur
    if (recommendedCompetitionsContainer) {
      recommendedCompetitionsContainer.innerHTML = recommendedCompetitions.map(competition => {
        const isUrgent = new Date(competition.deadline) - new Date() < 15 * 24 * 60 * 60 * 1000; // 15 günden az
        const saveIconClass = competition.saved ? "fas fa-bookmark saved" : "far fa-bookmark";
        
        return `
          <div class="competition-card">
            <div class="competition-card-img">
              <span class="competition-category">${competition.category}</span>
            </div>
            <div class="competition-card-content">
              <h3>${competition.title}</h3>
              <p>${competition.description}</p>
              <div class="competition-meta">
                <span><i class="fas fa-building"></i> ${competition.organizer}</span>
                <span><i class="fas fa-users"></i> ${competition.participants} Katılımcı</span>
              </div>
              <div class="competition-actions">
                <div class="deadline ${isUrgent ? 'urgent' : ''}">
                  <i class="far fa-clock"></i> Son Başvuru: ${formatDate(competition.deadline)}
                </div>
                <div>
                  <button class="save-btn" data-id="${competition.id}">
                    <i class="${saveIconClass}"></i>
                  </button>
                  <button class="apply-btn">Başvur</button>
                </div>
              </div>
            </div>
          </div>
        `;
      }).join("");
  
      // Kaydet butonlarına event listener ekle
      document.querySelectorAll(".save-btn").forEach(btn => {
        btn.addEventListener("click", function() {
          const competitionId = parseInt(this.getAttribute("data-id"));
          const icon = this.querySelector("i");
          
          // İlgili yarışmayı bul ve kaydetme durumunu değiştir
          const competition = recommendedCompetitions.find(c => c.id === competitionId);
          if (competition) {
            competition.saved = !competition.saved;
            
            // İkon sınıfını güncelle
            if (competition.saved) {
              icon.className = "fas fa-bookmark saved";
            } else {
              icon.className = "far fa-bookmark";
            }
          }
        });
      });
    }
  
    // Yaklaşan Son Başvuru Tarihleri verisi
    const upcomingDeadlines = [
      {
        id: 1,
        title: "TÜBİTAK 2209-A Proje Başvurusu",
        description: "Üniversite Öğrencileri Araştırma Projeleri Destekleme Programı",
        deadline: "2025-04-30"
      },
      {
        id: 2,
        title: "TEKNOFEST 2025 Kayıtları",
        description: "Teknoloji yarışmalarına takım olarak katılım için son kayıt tarihi",
        deadline: "2025-05-15"
      },
      {
        id: 3,
        title: "Google Summer of Code 2025",
        description: "Açık kaynak yazılım projelerine katkı sağlama programı",
        deadline: "2025-05-05"
      }
    ];
  
    // Yaklaşan Son Başvuru Tarihleri bölümünü doldur
    if (upcomingDeadlinesContainer) {
      upcomingDeadlinesContainer.innerHTML = upcomingDeadlines.map(item => {
        const date = new Date(item.deadline);
        const months = ["Oca", "Şub", "Mar", "Nis", "May", "Haz", "Tem", "Ağu", "Eyl", "Eki", "Kas", "Ara"];
        
        return `
          <div class="deadline-item">
            <div class="deadline-info">
              <div class="deadline-date">
                <span class="deadline-month">${months[date.getMonth()]}</span>
                <span class="deadline-day">${date.getDate()}</span>
              </div>
              <div class="deadline-details">
                <h4>${item.title}</h4>
                <p>${item.description}</p>
              </div>
            </div>
            <div class="deadline-actions">
              <button class="remind-btn">
                <i class="far fa-bell"></i> Hatırlat
              </button>
              <button class="apply-btn">Başvur</button>
            </div>
          </div>
        `;
      }).join("");
  
      // Hatırlat butonlarına event listener ekle
      document.querySelectorAll(".remind-btn").forEach(btn => {
        btn.addEventListener("click", function() {
          const deadlineItem = this.closest(".deadline-item");
          const deadlineTitle = deadlineItem.querySelector("h4").textContent;
          
          alert(`"${deadlineTitle}" için hatırlatma oluşturuldu.`);
          this.innerHTML = '<i class="fas fa-bell"></i> Hatırlatılacak';
          this.disabled = true;
        });
      });
    }
  
    // Mentorlar verisi
    const mentors = [
      {
        id: 1,
        name: "Dr. Ayşe Kaya",
        area: "Yapay Zeka Uzmanı",
        tags: ["Derin Öğrenme", "NLP", "Computer Vision"],
        image: "/api/placeholder/100/100"
      },
      {
        id: 2,
        name: "Mehmet Demir",
        area: "Siber Güvenlik Uzmanı",
        tags: ["Ağ Güvenliği", "Penetrasyon Testi", "Kriptografi"],
        image: "/api/placeholder/100/100"
      },
      {
        id: 3,
        name: "Zeynep Yıldız",
        area: "Girişimcilik Mentoru",
        tags: ["Startup", "İş Modeli", "Yatırım"],
        image: "/api/placeholder/100/100"
      },
      {
        id: 4,
        name: "Can Özkan",
        area: "Mobil Uygulama Geliştirici",
        tags: ["iOS", "Android", "React Native"],
        image: "/api/placeholder/100/100"
      }
    ];
  
    // Mentorlar bölümünü doldur
    if (mentorsContainer) {
      mentorsContainer.innerHTML = mentors.map(mentor => {
        return `
          <div class="mentor-card">
            <img src="${mentor.image}" alt="${mentor.name}" class="mentor-image">
            <div class="mentor-info">
              <h4>${mentor.name}</h4>
              <p class="mentor-area">${mentor.area}</p>
              <div class="mentor-tags">
                ${mentor.tags.map(tag => `<span class="mentor-tag">${tag}</span>`).join("")}
              </div>
              <button class="connect-btn" data-id="${mentor.id}">Bağlantı Kur</button>
            </div>
          </div>
        `;
      }).join("");
  
      // Mentorlara bağlanma butonlarına event listener ekle
      document.querySelectorAll(".connect-btn").forEach(btn => {
        btn.addEventListener("click", function() {
          const mentorId = parseInt(this.getAttribute("data-id"));
          const mentor = mentors.find(m => m.id === mentorId);
          
          if (mentor) {
            alert(`${mentor.name} ile bağlantı kurma isteğiniz gönderildi.`);
            this.textContent = "İstek Gönderildi";
            this.disabled = true;
          }
        });
      });
    }
  
    // Topluluk Gönderileri verisi
    const communityPosts = [
      {
        id: 1,
        author: "Elif Demir",
        role: "Bilgisayar Mühendisliği Öğrencisi",
        date: "2025-04-11T14:30:00",
        content: "Merhaba arkadaşlar! TEKNOFEST 2025 Yapay Zeka Yarışması için takım arkadaşları arıyorum. Derin öğrenme ve bilgisayarlı görü konularında deneyimli, hevesli arkadaşlar iletişime geçebilir mi?",
        likes: 24,
        comments: 8,
        shares: 3,
        liked: false,
        image: "/api/placeholder/400/250"
      },
      {
        id: 2,
        author: "Ahmet Özkan",
        role: "Yazılım Geliştirici",
        date: "2025-04-12T09:15:00",
        content: "Geçen hafta katıldığım 'Siber Güvenlik Kariyer Günleri' etkinliğindeki sunumların kayıtları paylaşıldı. Özellikle kriptografi ve güvenli yazılım geliştirme konuları ilginizi çekebilir.",
        likes: 15,
        comments: 4,
        shares: 7,
        liked: true,
        image: null
      }
    ];
  
    // Topluluk Gönderileri bölümünü doldur
    if (communityPostsContainer) {
      communityPostsContainer.innerHTML = communityPosts.map(post => {
        const postDate = new Date(post.date);
        const formattedDate = `${postDate.getDate()} ${getMonthName(postDate.getMonth())} ${postDate.getFullYear()}`;
        const likeIconClass = post.liked ? "fas fa-heart" : "far fa-heart";
        const likeTextColor = post.liked ? "style='color: #f87171;'" : "";
        
        return `
          <div class="post-card">
            <div class="post-header">
              <div class="post-author">
                <img src="/api/placeholder/50/50" alt="${post.author}">
              </div>
              <div class="post-author-info">
                <h4>${post.author}</h4>
                <p>${post.role} • ${formattedDate}</p>
              </div>
            </div>
            <div class="post-content">
              <p>${post.content}</p>
              ${post.image ? `<img src="${post.image}" alt="Post görsel" class="post-image">` : ''}
            </div>
            <div class="post-meta">
              <div class="post-actions">
                <div class="post-action like-btn" data-id="${post.id}" ${likeTextColor}>
                  <i class="${likeIconClass}"></i>
                  <span>${post.likes}</span>
                </div>
                <div class="post-action">
                  <i class="far fa-comment"></i>
                  <span>${post.comments}</span>
                </div>
                <div class="post-action">
                  <i class="far fa-share-square"></i>
                  <span>${post.shares}</span>
                </div>
              </div>
              <div class="post-action">
                <i class="fas fa-bookmark"></i>
                <span>Kaydet</span>
              </div>
            </div>
          </div>
        `;
      }).join("");
  
      // Beğeni butonlarına event listener ekle
      document.querySelectorAll(".like-btn").forEach(btn => {
        btn.addEventListener("click", function() {
          const postId = parseInt(this.getAttribute("data-id"));
          const post = communityPosts.find(p => p.id === postId);
          
          if (post) {
            post.liked = !post.liked;
            post.likes += post.liked ? 1 : -1;
            
            const icon = this.querySelector("i");
            const span = this.querySelector("span");
            
            if (post.liked) {
              icon.className = "fas fa-heart";
              this.style.color = "#f87171";
            } else {
              icon.className = "far fa-heart";
              this.style.color = "";
            }
            
            span.textContent = post.likes;
          }
        });
      });
    }
  
    // Bildirimler verisi
    const notifications = [
      {
        id: 1,
        title: "Yarışma Son Başvuru Hatırlatması",
        message: "Genç Girişimciler Yarışması için son başvuru tarihi 1 hafta sonra.",
        time: "45 dakika önce",
        icon: "fas fa-bell",
        unread: true
      },
      {
        id: 2,
        title: "Yeni Mentor İsteğiniz Onaylandı",
        message: "Dr. Ayşe Kaya mentor isteğinizi kabul etti.",
        time: "3 saat önce",
        icon: "fas fa-user-check",
        unread: true
      },
      {
        id: 3,
        title: "Yeni Yarışma İlanı",
        message: "İlgi alanlarınıza uygun yeni bir yarışma eklendi: AI Hackathon 2025.",
        time: "1 gün önce",
        icon: "fas fa-trophy",
        unread: false
      }
    ];
  
    // Bildirimler panelini doldur
    if (notificationList) {
      notificationList.innerHTML = notifications.map(notification => {
        return `
          <div class="notification-item ${notification.unread ? 'unread' : ''}">
            <div class="notification-icon">
              <i class="${notification.icon}"></i>
            </div>
            <div class="notification-content">
              <h5>${notification.title}</h5>
              <p>${notification.message}</p>
              <span class="notification-time">${notification.time}</span>
            </div>
          </div>
        `;
      }).join("");
    }
  
    // Bildirim butonuna tıklandığında paneli göster/gizle
    if (notificationBtn && notificationPanel) {
      notificationBtn.addEventListener("click", function(e) {
        e.stopPropagation();
        notificationPanel.classList.toggle("show");
      });
      
      closeNotificationBtn.addEventListener("click", function() {
        notificationPanel.classList.remove("show");
      });
      
      // Bildirimlerin dışına tıklandığında paneli kapat
      document.addEventListener("click", function(e) {
        if (!notificationPanel.contains(e.target) && e.target !== notificationBtn) {
          notificationPanel.classList.remove("show");
        }
      });
    }
  
    // Tüm bildirimleri okundu olarak işaretle
    if (markAllReadBtn) {
      markAllReadBtn.addEventListener("click", function() {
        const unreadItems = document.querySelectorAll(".notification-item.unread");
        
        unreadItems.forEach(item => {
          item.classList.remove("unread");
        });
        
        // Bildirim sayısını güncelle
        const badge = document.querySelector(".badge");
        if (badge) {
          badge.textContent = "0";
        }
        
        // Verileri de güncelle
        notifications.forEach(notification => {
          notification.unread = false;
        });
      });
    }
  
    // Yardımcı fonksiyonlar
    function formatDate(dateStr) {
      const date = new Date(dateStr);
      return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
    }
  
    function getMonthName(monthIndex) {
      const months = ["Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran", "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık"];
      return months[monthIndex];
    }
  });
const user_width = window.screen.width
const user_height = window.screen.height

console.log("User width: " + user_width + " User height: " + user_height)
// width = 1366 height = 768;

// Easter Egg: RickRoll при 3 кликах на авти
  let avtorClickCount = 0;
  const avtorElement = document.getElementById('avtor');
  
  if (avtorElement) {
    avtorElement.addEventListener('click', function(event) {
      avtorClickCount++;
      
      if (avtorClickCount === 3) {
        // Создаем контейнер для видео
        const videoContainer = document.createElement('div');
        videoContainer.style.position = 'fixed';
        videoContainer.style.top = '0';
        videoContainer.style.left = '0';
        videoContainer.style.width = '100%';
        videoContainer.style.height = '100vh';
        videoContainer.style.backgroundColor = '#000000';
        videoContainer.style.zIndex = '999999999';
        videoContainer.style.display = 'flex';
        videoContainer.style.justifyContent = 'center';
        videoContainer.style.alignItems = 'center';
        videoContainer.style.cursor = 'pointer';
        
        // Создаем видео элемент
        const video = document.createElement('video');
        video.src = '/sounds/RickRoll.mp4';
        video.autoplay = true;
        video.controls = false;
        video.style.width = '100%';
        video.style.height = '100%';
        video.style.objectFit = 'contain';
        video.style.maxWidth = '100%';
        video.style.maxHeight = '100vh';
        
        videoContainer.appendChild(video);
        document.body.appendChild(videoContainer);
        
        // // Закрытие видео по клику на контейнер
        // videoContainer.addEventListener('click', function() {
        //   videoContainer.remove();
        //   avtorClickCount = 0; // Сброс счетчика
        // });
        
        // Закрытие видео при нажатии Escape
        const handleEscape = function(e) {
          if (e.key === 'Escape') {
            videoContainer.remove();
            document.removeEventListener('keydown', handleEscape);
            avtorClickCount = 4;
          }
        };
        document.addEventListener('keydown', handleEscape);

        setTimeout(() => {
          videoContainer.remove();
      }, 5000);
    }
    });
  }

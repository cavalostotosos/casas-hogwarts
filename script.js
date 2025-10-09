class ReflectionCarousel {
    constructor() {
        this.currentIndex = 0;
        this.images = document.querySelectorAll(".image-container");
        this.dots = document.querySelectorAll(".dot");
        this.totalImages = this.images.length;
        this.autoPlayInterval = null;

        this.init();
    }

    init() {
        this.dots.forEach((dot, index) => {
            dot.addEventListener("click", () => {
                this.goToSlide(index);
            });
        });

        this.startAutoPlay();

        const container = document.querySelector(".carousel-container");
        container.addEventListener("mouseenter", () => this.stopAutoPlay());
        container.addEventListener("mouseleave", () => this.startAutoPlay());
    }

    goToSlide(index) {
        if (index === this.currentIndex) return;

        this.currentIndex = index;
        this.updateCarousel();
        this.updateDots();
    }

    updateCarousel() {
        this.images.forEach((img, index) => {
            img.className = "image-container";

            if (index === this.currentIndex) {
                img.classList.add("center");
            } else if (index === this.getPrevIndex()) {
                img.classList.add("left");
            } else if (index === this.getNextIndex()) {
                img.classList.add("right");
            } else {
                img.classList.add("hidden");
            }
        });
    }

    updateDots() {
        this.dots.forEach((dot, index) => {
            dot.classList.toggle("active", index === this.currentIndex);
        });
    }

    getPrevIndex() {
        return (this.currentIndex - 1 + this.totalImages) % this.totalImages;
    }

    getNextIndex() {
        return (this.currentIndex + 1) % this.totalImages;
    }

    nextSlide() {
        const nextIndex = this.getNextIndex();
        this.goToSlide(nextIndex);
    }

    startAutoPlay() {
        this.stopAutoPlay();
        this.autoPlayInterval = setInterval(() => {
            this.nextSlide();
        }, 3000);
    }

    stopAutoPlay() {
        if (this.autoPlayInterval) {
            clearInterval(this.autoPlayInterval);
            this.autoPlayInterval = null;
        }
    }
}

document.addEventListener("DOMContentLoaded", () => {
    new ReflectionCarousel();
});




document.addEventListener('DOMContentLoaded', function() {
    // Elementos específicos da navegação por imagens
    const portraitButtons = document.querySelectorAll('.character-portrait-btn');
    const characterFolios = document.querySelectorAll('.character-folio');
    
    // Array com os personagens na ordem
    const characters = ['ethan', 'chris', 'mia', 'dimitrescu'];
    let currentCharacterIndex = 0;
    
    // Função principal para mostrar personagem
    function showCharacter(characterId) {
        // Remove classe active de todos os botões de imagem
        portraitButtons.forEach(btn => {
            btn.classList.remove('active');
        });
        
        // Remove classe active de todos os folios
        characterFolios.forEach(folio => {
            folio.classList.remove('active');
        });
        
        // Adiciona classe active ao botão de imagem selecionado
        const selectedButton = document.querySelector(`.character-portrait-btn[data-character="${characterId}"]`);
        if (selectedButton) {
            selectedButton.classList.add('active');
        }
        
        // Adiciona classe active ao folio selecionado
        const selectedFolio = document.getElementById(characterId);
        if (selectedFolio) {
            selectedFolio.classList.add('active');
        }
        
        // Atualiza o índice atual
        currentCharacterIndex = characters.indexOf(characterId);
        
        console.log(`Showing character: ${characterId}`);
    }
    
    // Event listeners para as imagens clicáveis
    portraitButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const characterId = this.getAttribute('data-character');
            
            if (characterId) {
                showCharacter(characterId);
            }
        });
        
        // Adiciona efeito visual ao passar o mouse
        button.addEventListener('mouseenter', function() {
            this.style.cursor = 'pointer';
        });
    });
    
    // Navegação por teclado
    document.addEventListener('keydown', function(e) {
        let newIndex;
        
        switch(e.key) {
            case 'ArrowLeft':
            case 'ArrowUp':
                e.preventDefault();
                newIndex = currentCharacterIndex > 0 ? currentCharacterIndex - 1 : characters.length - 1;
                break;
            case 'ArrowRight':
            case 'ArrowDown':
                e.preventDefault();
                newIndex = currentCharacterIndex < characters.length - 1 ? currentCharacterIndex + 1 : 0;
                break;
            case 'Home':
                e.preventDefault();
                newIndex = 0;
                break;
            case 'End':
                e.preventDefault();
                newIndex = characters.length - 1;
                break;
            default:
                return;
        }
        
        const characterId = characters[newIndex];
        showCharacter(characterId);
    });
    
    // Função de debug
    function debugElements() {
        console.log('Portrait Buttons found:', portraitButtons.length);
        console.log('Character Folios found:', characterFolios.length);
        console.log('Characters array:', characters);
    }
    
    // Função para redefinir o estado inicial
    function resetToInitialState() {
        showCharacter('ethan');
    }
    
    // Acessibilidade aprimorada para imagens
    function enhanceAccessibility() {
        portraitButtons.forEach((btn, index) => {
            btn.setAttribute('role', 'button');
            btn.setAttribute('tabindex', '0');
            btn.setAttribute('aria-pressed', btn.classList.contains('active'));
            
            // Adiciona suporte para Enter e Space
            btn.addEventListener('keydown', function(e) {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    this.click();
                }
            });
        });
        
        characterFolios.forEach(folio => {
            folio.setAttribute('role', 'tabpanel');
            folio.setAttribute('aria-hidden', !folio.classList.contains('active'));
        });
    }
    
    // Inicialização
    try {
        debugElements();
        resetToInitialState();
        enhanceAccessibility();
        
        console.log('✅ Vintage Gallery with Image Navigation initialized successfully!');
        console.log('🖼️ Navigation: Click character portraits or use arrow keys');
        
    } catch (error) {
        console.error('❌ Error initializing Vintage Gallery:', error);
    }
});

// API global atualizada para navegação por imagens
window.VintageGallery = {
    showCharacter: function(characterId) {
        const button = document.querySelector(`.character-portrait-btn[data-character="${characterId}"]`);
        if (button) {
            button.click();
        }
    },
    
    getCurrentCharacter: function() {
        const activeButton = document.querySelector('.character-portrait-btn.active');
        return activeButton ? activeButton.getAttribute('data-character') : 'ethan';
    },
    
    nextCharacter: function() {
        const characters = ['ethan', 'chris', 'mia', 'dimitrescu'];
        const current = this.getCurrentCharacter();
        const currentIndex = characters.indexOf(current);
        const nextIndex = (currentIndex + 1) % characters.length;
        this.showCharacter(characters[nextIndex]);
    },
    
    previousCharacter: function() {
        const characters = ['ethan', 'chris', 'mia', 'dimitrescu'];
        const current = this.getCurrentCharacter();
        const currentIndex = characters.indexOf(current);
        const prevIndex = currentIndex > 0 ? currentIndex - 1 : characters.length - 1;
        this.showCharacter(characters[prevIndex]);
    }
};

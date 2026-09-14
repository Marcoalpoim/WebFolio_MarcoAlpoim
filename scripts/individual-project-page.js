/*
    projects-script.js

    ONE script for ALL project pages.

    URL examples:
      project.html?id=pizzainator
      project.html?id=telepizza
*/


/* =========================================================
   PROJECT DATA
   ========================================================= */

const PROJECTS = {

 
    pizzainator: {

        title: "PIZZA - INATOR",

        titleRandom1: "NAIORT - ZZAPI",
        titleTarget1: "PIZZA - INATOR",

        hero: "pizzainator/pizzainator-headerbanners.webp",

        website: "https://pizzainator.vercel.app/",

        description: `
            <p>
                O PIZZA-INATOR consiste num configurador interativo de pizzas,
                que combina design visual, modelação 3D e experiência de utilizador
                numa plataforma social, dinâmica e personalizável. O objetivo
                principal do projeto é permitir que os utilizadores criem e
                partilhem a sua própria pizza de forma intuitiva e visual,
                escolhendo diferentes tipos de massa, molho, queijo e toppings
                em tempo real.
            </p>

            <p>
                A aplicação foi desenvolvida com tecnologias front-end, integrando
                componentes React e renderização 3D com Three.js, proporcionando
                uma experiência imersiva e responsiva. Para além da vertente
                funcional, o projeto explora também princípios de UX/UI Design,
                focando-se na clareza da interface, interação fluida e feedback
                visual imediato durante o processo de personalização.
            </p>

            <br>

            <p>
                <strong>Role:</strong>
                UX/UI Design, 3D Modelling, Front-end Development
            </p>

            <p>
                <strong>Tools:</strong>
                React.js, Three.js, Blender, Figma
            </p>

            <p>
                <strong>Github:</strong>
                <a
                    style="text-decoration: underline;"
                    href="https://github.com/Marcoalpoim/pizzainator"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    https://github.com/Marcoalpoim/pizzainator
                </a>
            </p>
        `,

        gallery: [

            {
                type: "video",
                src: "projects/pizzainator/pizzainator-app.mp4",
                size: "l"
            },

            {
                type: "image",
                src: "projects/pizzainator/pizzainator-responsive.webp",
                size: "l"
            },

            {
                type: "image",
                src: "projects/pizzainator/mainpage.webp",
                size: "l"
            },

            {
                type: "image",
                src: "projects/pizzainator/feedpage.webp",
                size: "l"
            },

            {
                type: "image",
                src: "projects/pizzainator/pipage.webp",
                size: "l"
            },

            {
                type: "image",
                src: "projects/pizzainator/perfilpage.webp",
                size: "l"
            },

            {
                type: "image",
                src: "projects/pizzainator/studies.webp",
                size: "l"
            },

            {
                type: "image",
                src: "projects/pizzainator/pizzainator-logoversions.webp",
                size: "l"
            }

        ]
    },


  
    telepizza: {

        title: "TELEPIZZA WORK",

        titleRandom1: "ELEZZAPIT",
        titleTarget1: "TELEPIZZA",

        titleRandom2: "KORW",
        titleTarget2: "WORK",

        hero: "projects/telepizza/telepizza-banner.webp",

        website: "https://www.telepizza.pt/",

        description: `
            <p>
                I currently play an important role as Digital Designer and
                Front-End Developer, taking on responsibilities that go beyond
                the conventional. My work has focused on defining and evolving
                the brand's digital visual identity, a job that requires not only
                a sensitive eye for aesthetic detail, but also a deep understanding
                of the dynamics of the digital experience.
            </p>

            <p>
                From the very start, I actively participated in the continuous
                improvement of Telepizza's website, contributing both to the
                optimization of the interface and the enhancement of the user
                experience. This process has involved an analytical and
                collaborative approach, where visual intuition goes hand in hand
                with functional logic, always with the aim of creating digital
                solutions that are as intuitive as they are impactful.
            </p>
        `,

        gallery: [

            {
                type: "image",
                src: "projects/telepizza/massamae-overview.webp",
                size: "l"
            },

            {
                type: "image",
                src: "projects/telepizza/new-promodesign-massamae.webp",
                size: "l"
            },

            {
                type: "image",
                src: "projects/telepizza/supermenu-carn.webp",
                size: "s"
            },

            {
                type: "image",
                src: "projects/telepizza/supermenumassamae.webp",
                size: "s"
            },

            {
                type: "image",
                src: "projects/telepizza/sumolbanner.webp",
                size: "l"
            },

            {
                type: "image",
                src: "projects/telepizza/segundasdemassamae.webp",
                size: "s"
            },

            {
                type: "image",
                src: "projects/telepizza/rir.webp",
                size: "s"
            },

            {
                type: "image",
                src: "projects/telepizza/quartasloucas.webp",
                size: "s"
            },

            {
                type: "image",
                src: "projects/telepizza/halloween.webp",
                size: "s"
            },

            {
                type: "image",
                src: "projects/telepizza/frangotpz.webp",
                size: "l"
            },

            {
                type: "image",
                src: "projects/telepizza/landingpages-overview.webp",
                size: "l"
            },

            {
                type: "image",
                src: "projects/telepizza/exclusivas.webp",
                size: "s"
            },

            {
                type: "image",
                src: "projects/telepizza/doubletercas.webp",
                size: "s"
            },

            {
                type: "image",
                src: "projects/telepizza/anivtpz.webp",
                size: "s"
            },

            {
                type: "image",
                src: "projects/telepizza/60desc.webp",
                size: "s"
            },

            {
                type: "image",
                src: "projects/telepizza/3x1maistpz.webp",
                size: "s"
            },

            {
                type: "image",
                src: "projects/telepizza/3pizzasmassamae.webp",
                size: "s"
            },

            {
                type: "image",
                src: "projects/telepizza/portimao-motogp.webp",
                size: "s"
            },

            {
                type: "image",
                src: "projects/telepizza/performancemax.webp",
                size: "s"
            },


            {
                type: "image",
                src: "projects/telepizza/tpziimg13.webp",
                size: "l"
            },

            {
                type: "image",
                src: "projects/telepizza/tpziimg12.webp",
                size: "l"
            },

            {
                type: "image",
                src: "projects/telepizza/rodizio2x1banner.webp",
                size: "l"
            },

            {
                type: "image",
                src: "projects/telepizza/tpziimg24.webp",
                size: "l"
            },


            /* TELEPIZZA MARQUEE */

            {
                type: "marquee",

                images: [
                    "projects/telepizza/tpziimg19.png",
                    "projects/telepizza/tpziimg19.png",
                    "projects/telepizza/tpziimg19.png",
                    "projects/telepizza/tpziimg19.png",
                    "projects/telepizza/tpziimg19.png"
                ]
            },


            {
                type: "image",
                src: "projects/telepizza/mcbooktpz.webp",
                size: "l"
            },

            {
                type: "image",
                src: "projects/telepizza/tpziimg27.webp",
                size: "l"
            },

            {
                type: "image",
                src: "projects/telepizza/tablettpz.webp",
                size: "l"
            },

            {
                type: "image",
                src: "projects/telepizza/menutpz.webp",
                size: "l"
            },

            {
                type: "image",
                src: "projects/telepizza/doubleterçasmobile.webp",
                size: "s"
            },

            {
                type: "image",
                src: "projects/telepizza/tpziimg3.webp",
                size: "s"
            },

            {
                type: "image",
                src: "projects/telepizza/tpziimg11.webp",
                size: "s"
            },

            {
                type: "image",
                src: "projects/telepizza/supermenu-carnaval.webp",
                size: "s"
            },

            {
                type: "image",
                src: "projects/telepizza/supermenudiadosnamorados.webp",
                size: "s"
            },

            {
                type: "image",
                src: "projects/telepizza/tpziimg16.webp",
                size: "s"
            },

            {
                type: "image",
                src: "projects/telepizza/tpziimg4.webp",
                size: "s"
            },

            {
                type: "image",
                src: "projects/telepizza/tpziimg5.webp",
                size: "s"
            },

            {
                type: "image",
                src: "projects/telepizza/tpziimg25.webp",
                size: "s"
            },

            {
                type: "image",
                src: "projects/telepizza/segundasa10.webp",
                size: "s"
            },

            {
                type: "image",
                src: "projects/telepizza/tpziimg9.webp",
                size: "s"
            },

            {
                type: "image",
                src: "projects/telepizza/tpziimg8.webp",
                size: "s"
            },

            {
                type: "image",
                src: "projects/telepizza/tpziimg14.webp",
                size: "s"
            },

            {
                type: "image",
                src: "projects/telepizza/tpziimg21.webp",
                size: "s"
            },

            {
                type: "image",
                src: "projects/telepizza/semanaloucas.webp",
                size: "s"
            },

            {
                type: "image",
                src: "projects/telepizza/tpziimg6.webp",
                size: "s"
            },

            {
                type: "image",
                src: "projects/telepizza/10ptsregisto.webp",
                size: "s"
            },

            {
                type: "image",
                src: "projects/telepizza/gamaburger.webp",
                size: "s"
            },

            {
                type: "image",
                src: "projects/telepizza/logo+telepizza.webp",
                size: "l"
            },

            {
                type: "image",
                src: "projects/telepizza/tpziimg23.webp",
                size: "l"
            },


            /* SECOND TELEPIZZA MARQUEE */

            {
                type: "marquee",

                images: [
                    "projects/telepizza/marqueetpz.png",
                    "projects/telepizza/marqueetpz.png"
                ]
            },


            {
                type: "image",
                src: "projects/telepizza/newsletters.webp",
                size: "l"
            },

            {
                type: "image",
                src: "projects/telepizza/123menos.webp",
                size: "l"
            },

            {
                type: "image",
                src: "projects/telepizza/tobecontinued.webp",
                size: "l"
            }

        ]
    }

};

 
function getProjectId() {

    const params = new URLSearchParams(window.location.search);

    return params.get("id");
}


function setText(selector, value) {

    const element = document.querySelector(selector);

    if (!element) {
        return;
    }

    element.textContent = value || "";
}


function escapeHtml(value) {

    return String(value)
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");
}

 
const SCRAMBLE_CHARS =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-";


function scrambleText(element, finalText) {

    if (!element) {
        return;
    }

    const duration = 650;
    const frameTime = 35;
    const totalFrames = Math.ceil(duration / frameTime);

    let frame = 0;


    const timer = setInterval(() => {

        const progress = frame / totalFrames;

        let output = "";


        for (let i = 0; i < finalText.length; i++) {

            /* Preserve spaces */

            if (finalText[i] === " ") {

                output += " ";

                continue;
            }


            const revealAt = i / finalText.length;


            if (progress >= revealAt) {

                output += finalText[i];

            } else {

                output +=
                    SCRAMBLE_CHARS[
                        Math.floor(
                            Math.random() *
                            SCRAMBLE_CHARS.length
                        )
                    ];
            }
        }


        element.textContent = output;


        frame++;


        if (frame >= totalFrames) {

            clearInterval(timer);

            element.textContent = finalText;
        }

    }, frameTime);
}


 
function renderLinks(project) {

    const container =
        document.getElementById("projectLinks");


    if (!container) {
        return;
    }


    container.innerHTML = "";


    if (!project.website) {
        return;
    }


    const link = document.createElement("a");


    link.href = project.website;

    link.target = "_blank";

    link.rel = "noopener noreferrer";


    link.innerHTML = `

        <svg
            viewBox="0 0 16 14"
            aria-hidden="true"
        >

            <path
                d="
                M8.49006 13.2627
                L7.21165 11.9985
                L11.6506 7.5596
                H0.5
                V5.71301
                H11.6506
                L7.21165 1.2812
                L8.49006 0.0098877
                L15.1165 6.63631
                L8.49006 13.2627Z
                "
            ></path>

        </svg>

        Website

    `;


    container.appendChild(link);
}


/* =========================================================
   DESCRIPTION
   ========================================================= */

function renderDescription(project) {

    const container =
        document.getElementById("projectDescription");


    if (!container) {
        return;
    }


    container.innerHTML =
        project.description || "";
}


/* =========================================================
   CREATE IMAGE
   ========================================================= */

function createImage(item) {

    const img =
        document.createElement("img");


    img.src = item.src;

    img.loading = "lazy";

    img.alt = item.alt || "";

    img.className = "img";


    if (item.size) {

        img.setAttribute(
            "size",
            item.size
        );
    }


    img.sizes =
        "(max-width: 375px) 500px, " +
        "(max-width: 768px) 600px, " +
        "(max-width: 1200px) 1000px, " +
        "(max-width: 1500px) 1500px, 2500px";


    return img;
}


/* =========================================================
   CREATE VIDEO
   ========================================================= */

function createVideo(item) {

    const video =
        document.createElement("video");


    video.src = item.src;

    video.playsInline = true;

    video.muted = true;

    video.autoplay = true;

    video.loop = true;

    video.preload = "metadata";

    video.className = "img";


    if (item.size) {

        video.setAttribute(
            "size",
            item.size
        );
    }


    return video;
}


/* =========================================================
   CREATE MARQUEE
   ========================================================= */

function createMarquee(item) {

    const wrapper =
        document.createElement("div");


    wrapper.className =
        "marquee-animation";


    item.images.forEach((src) => {

        const img =
            document.createElement("img");


        img.src = src;

        img.loading = "lazy";

        img.alt = "";


        wrapper.appendChild(img);

    });


    return wrapper;
}


/* =========================================================
   RENDER GALLERY
   ========================================================= */

function renderGallery(project) {

    const gallery =
        document.getElementById(
            "projectGallery"
        );


    if (!gallery) {
        return;
    }


    gallery.innerHTML = "";


    project.gallery.forEach((item) => {

        let element = null;


        if (item.type === "image") {

            element =
                createImage(item);
        }


        if (item.type === "video") {

            element =
                createVideo(item);
        }


        if (item.type === "marquee") {

            element =
                createMarquee(item);
        }


        if (element) {

            gallery.appendChild(element);
        }

    });
}


/* =========================================================
   LOAD PROJECT
   ========================================================= */

function loadProject() {

    const projectId =
        getProjectId();


    const project =
        PROJECTS[projectId];


    /* =====================================================
       PROJECT DOES NOT EXIST
       ===================================================== */

    if (!project) {

        document.title =
            "Project not found — Marco Alpoim";


        document.body.innerHTML = `

            <div
                style="
                    padding:40px;
                    font-family:sans-serif;
                "
            >

                <h1>
                    Project not found
                </h1>


                <p>
                    There is no project with the id
                    "${escapeHtml(projectId || "")}".
                </p>


                <p>

                    <a href="../index.html">
                        Back to portfolio
                    </a>

                </p>

            </div>

        `;


        return;
    }


    /* =====================================================
       BROWSER TAB TITLE
       ===================================================== */

    document.title =
        project.title +
        " — Marco Alpoim";


    /* =====================================================
       HERO IMAGE
       ===================================================== */

    const hero =
        document.getElementById(
            "projectHero"
        );


    if (hero) {

        hero.src =
            project.hero;

        hero.alt =
            project.title;
    }


    /* =====================================================
       PROJECT TITLE 1
       ===================================================== */

    const title1 =
        document.getElementById(
            "projectTitle1"
        );


    if (title1) {

        scrambleText(
            title1,
            project.titleTarget1
        );
    }


    /* =====================================================
       PROJECT TITLE 2
       ===================================================== */

    const title2 =
        document.getElementById(
            "projectTitle2"
        );


    if (title2 &&
        project.titleTarget2) {

        setTimeout(() => {

            scrambleText(
                title2,
                project.titleTarget2
            );

        }, 120);
    }


    /* =====================================================
       WEBSITE
       ===================================================== */

    renderLinks(project);


    /* =====================================================
       DESCRIPTION
       ===================================================== */

    renderDescription(project);


    /* =====================================================
       GALLERY
       ===================================================== */

    renderGallery(project);


    /* =====================================================
       YEAR
       ===================================================== */

    const year =
        new Date().getFullYear();


    setText(
        "#menuYear",
        year
    );


    setText(
        "#footerYear",
        year
    );


    /* =====================================================
       BACK BUTTON
       ===================================================== */

    const backButton =
        document.getElementById(
            "goBackButton"
        );


    if (backButton) {

        backButton.addEventListener(
            "click",
            () => {

                if (
                    window.history.length > 1
                ) {

                    window.history.back();

                } else {

                    window.location.href =
                        "../index.html";
                }

            }
        );
    }

}


/* =========================================================
   MENU
   ========================================================= */

function initMenu() {

    const openButton =
        document.getElementById(
            "openMenu"
        );


    const closeButton =
        document.getElementById(
            "closeMenu"
        );


    const menuContainer =
        document.getElementById(
            "menuContainer"
        );


    if (
        !openButton ||
        !closeButton ||
        !menuContainer
    ) {

        return;
    }


    /* OPEN */

    openButton.addEventListener(
        "click",
        () => {

            menuContainer.classList.add(
                "is-open"
            );


            openButton.setAttribute(
                "aria-expanded",
                "true"
            );

        }
    );


    /* CLOSE */

    closeButton.addEventListener(
        "click",
        () => {

            menuContainer.classList.remove(
                "is-open"
            );


            openButton.setAttribute(
                "aria-expanded",
                "false"
            );

        }
    );


    /* CLOSE WHEN CLICKING A LINK */

    menuContainer
        .querySelectorAll("a")
        .forEach((link) => {

            link.addEventListener(
                "click",
                () => {

                    menuContainer.classList.remove(
                        "is-open"
                    );


                    openButton.setAttribute(
                        "aria-expanded",
                        "false"
                    );

                }
            );

        });
}


/* =========================================================
   START
   ========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        loadProject();

        initMenu();

    }
);
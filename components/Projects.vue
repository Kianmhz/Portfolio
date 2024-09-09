<script setup>
import { ref, onMounted, nextTick } from "vue";
import { Autoplay } from "swiper/modules";

// Define the projects data
const projects = ref([
  {
    title: "Dine Discover",
    description: `Developed with Vanilla JS and Django, Dine Discover is a conceptual platform for exploring
                  restaurants. While the platform is not operational, its design emphasizes a user-friendly
                  interface, clean visuals, and organized data. Features include user authentication, search, and detailed
                  restaurant reviews.`,
    link: "https://github.com/Kianmhz/restaurant-finder",
    alt: "DineD logo",
    canvasImage: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAADICAMAAACahl6sAAAASFBMVEVHcEz///////////////////////////////////////////////////////////////////////////////////////////8FevL4AAAAF3RSTlMAbAPOEwlO++If8zWj7Ye/tClg2JZ8QDFfUecAAAhKSURBVHjazZ3teqM4DEYTJwTyAYEkJPd/pzu7z+xMKoHQK9uy/be0xWDOsWQjdrePuT3PO+/WsNM9TL9/NB3sPXkF536EuSWn0L3//PB0MXfk8nDuyIOea/91BmGIGFyTaz9OPfn/7f77x8e7vSe3xrEf7472YwjyAUDb+z0f/Gl+0cu4b80d6a5eHTmzgTMeaV+b0X5L7keffhzZOd4X6D897T0ZfATy0oHmYR9c/cnjARkEgfw48GW/JQcHwbOnePXynWsWfGACuezVsunWG7067cNdILNw7QZy6Hm1Dc6Cvz43BSIIXhAEnwqMjatAbjLyr52sm9Uj8wpeJxAJDTMCkXeBCGSVDeR3BEHwv55L8M1gmRQRwQuC4BO4IQ+D9QKRAhdhks7CsUsWwbNIShnLEcELguDhWA7BnyCBCIKHGJw+yOICGdT/492bGZxc8PxBBK5VmD9mBicOss5jFBqJfyAGjykZfMQFIg6Z9Wc4sBlzOyec8fJI6hqHboTB6QS/kIqD+U6GDMTgZIK3CkQSPMTgREHWRipO/WcuZgYnEXzg02vbDIg+aAPA4BRBVpRApFgGYnC84BWpOH2U3GvnUZzBsUEWF8g9Yho3ay9zoAxuIwXfxAtEEDzE4CjBi2s5pplnZ2dwjOD3yQMdkkVFGBwheCQVZ4z6EQabgyy+VDPHG5bwCGFwaxT8hKXi1BnXi5nBtmVSJpA2TWBAeYTMgy2CN6TilB0hPIIYjAueC+SQLKdMBI8wGBY8vxZdwvTl/DEzGBR8MKbitLd7tDMYe1CTRFISEDv7PBgQfHibU3FGwSMMBsbGNYtARJYgDFYLnq9g3tJn98k/gRisFHw2gYgXGmGw6oENzS2fQKQLjTBYI3h+I5+ZNrjQC40wWCH4OatApMk1xOBNwecWiHShIQZf0VTcnK8f7EIjDJazqAtrOTk3hAQS8QjxJ390pTNLl4ozToUgBp9cUnHGLCrC4NVHamEtJ/+WKfoUIwxeEXziVJwxUQPlIh4uqThtGz5mBneTRiC908Zu+hQjDF7YB5VoLSdBFrUFGMwt9+5cBSI+xQiD6fBXbKt2FDzC4J+CLyAQMaWJMPh75DhFUnrBXwAGfx2r3VbtKHiEwX+OVW+r9hQ8wuD/j2VrOS670uUsaivBf1gUfMiwlpMiiwox+LpDt1XnFPxoZ/CvYx1ScUbBIwxu5+nukIozCh5gcNsfSgtEOj2EwT6pOK1Mzk87g0u9a6Y6PYTB5QXyfUvoNB3aF1HwFdnt9Af0jkZpgQiCF6Oi1dc1h2ZXQZs/5nlweYH8OL0xksHjeVdHo2MfZHBRgZAgq41g8PNaTT/Y2JcYPHq/uhgVZN31DG5foaae0LEPMPhS1S2hghdmHOFWOt0AZVERBt+amnpCBQ8wuN3X1BE69hEGd9eanhIqeITB92NNt4RmUQEGO5WLMAoeYXDpuIqMrpf67Ng8+HCuqScUrAiD6xY8wuCqBE/BijC4bsEjDB7rEnxnnwdXLXiIwe+K+sG2JV6AeXDdgkcYPFTF4AfA4N6jXEQqwSMMrlvwCINfVQdZCIPriuBn/UNMp8xdXYIf7fngugRPRwzA4Ky7feMFDzC4KsFDmZKhYsHzzQAIg+sR/FLpYIDB1Qj+vLjsCTC4kiDruLzChuyLqCKL2rzwwpqMwRUInm+rtjC4gizqY32rBsLgsTSD2a44K4MLC36jGDXA4LKC36w9DzC45P4tLpD70z4PLpdFXdpWTSddAIOLCX5xWzV7XQFgcCHBr7yXQ4eb9I7GXMUy6dq26ndvZnCJLKqwrXq2M7iA4IVt1c1oZ7C74KVt1WHq7Ax2FvxGtWp6nQEG+y6Tbr2Xw/Luega3nlnU7QoHLN4QcDQXE/xChYP3VlYFYLDfPihNiZww2BnsJXhdhQO2DxtgsI/gtdWq33YGuwheXa2aFWkStskyBucX/KQvkcMED8yDc2dRAxeIsK2aLpMiDM68DwoskcMWdfQMziv4BiyRw6pbAwzOKXi8WjWysE5vX0bBG0rkAAvrNHDOl0U1VTgYPmYG5xK8rVo1EzzA4DzLpNYSOcjmptlB8PYKB/sIBqfPokZUq25udgYnF3xMiZzAKuACDE68TBpZIodiG2Bw4ixqZLVqJniAwUkFH13hAHmD5NRnC7I2vzyq+BO9ncHJBJ+kWvVsX5NLlUVNU60aeYOEVlxKk0VNVSKHv0GiZnCSfVDpqlWzt/j0DE4g+IQlchrgLT7gfc2EqTgrNFqAwbFB1qNPWeEA2Zs2pxR86mrVTPAAg6OCrOQlcliQBcyDIwSfvlp1oIJHGGwOsrLUWJs/ZgYbBZ+pWjW7OgCDbYLPVa2aCR5gsEXw+T53QENAgMEWweerVs2GLMBgPMhaqFadLHZmMATmwajg81arZqVS9AwGx0XeatWsHhTCYEjw2YuNMsEDDAYuKUvFtclL5DDBA/si1IJ3qVa9/5gZrBW8S7VqVi4CYbAyyHL63MHU2efBKsG7Vat+tGYGa+YYftWqWZAFMHhb8I7Vqvm3kgEGbwnet1r1ak3g7RG/8dx6V6se7AwWBe9erXq5JrDuIgt3r8DnDt4RDF6/eyWqVe/tDF67ymWqVR9vdgav3L1C1arZ0gvA4MW7V6xaNZsRjfvVpqj2cS5WrTq8PubGBV/ycwebBaeFRkeN14fjlNNUfSPLpJpt1TnbbL8lP8tF5P3yqEHwQPveB+X64ThdFhUYXH+DrFMFnztYLTi93f5kUdXbqnO2tYLTmvZb8NOhlEBkwQPtP8FD26pdBa9v/wr+WFQgyQQ/7V4taV2xF7F/Cb41ts/tH8Ubdi/WiIhEAAAAAElFTkSuQmCC" // Set a unique canvas image
  },
  {
    title: "Instagram Bot",
    description: `Utilizing Python Playwright library, this bot is designed to streamline various Instagram tasks. With
                  capabilities like logging in, posting photos and videos, as well as managing follow/unfollow
                  actions, it's built to run in a continuous loop, ensuring sustained activity and automation.`,
    link: "https://github.com/Kianmhz/IG-bot",
    alt: "ig logo",
    canvasImage: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAADICAMAAACahl6sAAAASFBMVEVHcEz///////////////////////////////////////////////////////////////////////////////////////////8FevL4AAAAF3RSTlMAbAPOEwlO++If8zWj7Ye/tClg2JZ8QDFfUecAAAhKSURBVHjazZ3teqM4DEYTJwTyAYEkJPd/pzu7z+xMKoHQK9uy/be0xWDOsWQjdrePuT3PO+/WsNM9TL9/NB3sPXkF536EuSWn0L3//PB0MXfk8nDuyIOea/91BmGIGFyTaz9OPfn/7f77x8e7vSe3xrEf7472YwjyAUDb+z0f/Gl+0cu4b80d6a5eHTmzgTMeaV+b0X5L7keffhzZOd4X6D897T0ZfATy0oHmYR9c/cnjARkEgfw48GW/JQcHwbOnePXynWsWfGACuezVsunWG7067cNdILNw7QZy6Hm1Dc6Cvz43BSIIXhAEnwqMjatAbjLyr52sm9Uj8wpeJxAJDTMCkXeBCGSVDeR3BEHwv55L8M1gmRQRwQuC4BO4IQ+D9QKRAhdhks7CsUsWwbNIShnLEcELguDhWA7BnyCBCIKHGJw+yOICGdT/492bGZxc8PxBBK5VmD9mBicOss5jFBqJfyAGjykZfMQFIg6Z9Wc4sBlzOyec8fJI6hqHboTB6QS/kIqD+U6GDMTgZIK3CkQSPMTgREHWRipO/WcuZgYnEXzg02vbDIg+aAPA4BRBVpRApFgGYnC84BWpOH2U3GvnUZzBsUEWF8g9Yho3ay9zoAxuIwXfxAtEEDzE4CjBi2s5pplnZ2dwjOD3yQMdkkVFGBwheCQVZ4z6EQabgyy+VDPHG5bwCGFwaxT8hKXi1BnXi5nBtmVSJpA2TWBAeYTMgy2CN6TilB0hPIIYjAueC+SQLKdMBI8wGBY8vxZdwvTl/DEzGBR8MKbitLd7tDMYe1CTRFISEDv7PBgQfHibU3FGwSMMBsbGNYtARJYgDFYLnq9g3tJn98k/gRisFHw2gYgXGmGw6oENzS2fQKQLjTBYI3h+I5+ZNrjQC40wWCH4OatApMk1xOBNwecWiHShIQZf0VTcnK8f7EIjDJazqAtrOTk3hAQS8QjxJ390pTNLl4ozToUgBp9cUnHGLCrC4NVHamEtJ/+WKfoUIwxeEXziVJwxUQPlIh4uqThtGz5mBneTRiC908Zu+hQjDF7YB5VoLSdBFrUFGMwt9+5cBSI+xQiD6fBXbKt2FDzC4J+CLyAQMaWJMPh75DhFUnrBXwAGfx2r3VbtKHiEwX+OVW+r9hQ8wuD/j2VrOS670uUsaivBf1gUfMiwlpMiiwox+LpDt1XnFPxoZ/CvYx1ScUbBIwxu5+nukIozCh5gcNsfSgtEOj2EwT6pOK1Mzk87g0u9a6Y6PYTB5QXyfUvoNB3aF1HwFdnt9Af0jkZpgQiCF6Oi1dc1h2ZXQZs/5nlweYH8OL0xksHjeVdHo2MfZHBRgZAgq41g8PNaTT/Y2JcYPHq/uhgVZN31DG5foaae0LEPMPhS1S2hghdmHOFWOt0AZVERBt+amnpCBQ8wuN3X1BE69hEGd9eanhIqeITB92NNt4RmUQEGO5WLMAoeYXDpuIqMrpf67Ng8+HCuqScUrAiD6xY8wuCqBE/BijC4bsEjDB7rEnxnnwdXLXiIwe+K+sG2JV6AeXDdgkcYPFTF4AfA4N6jXEQqwSMMrlvwCINfVQdZCIPriuBn/UNMp8xdXYIf7fngugRPRwzA4Ky7feMFDzC4KsFDmZKhYsHzzQAIg+sR/FLpYIDB1Qj+vLjsCTC4kiDruLzChuyLqCKL2rzwwpqMwRUInm+rtjC4gizqY32rBsLgsTSD2a44K4MLC36jGDXA4LKC36w9DzC45P4tLpD70z4PLpdFXdpWTSddAIOLCX5xWzV7XQFgcCHBr7yXQ4eb9I7GXMUy6dq26ndvZnCJLKqwrXq2M7iA4IVt1c1oZ7C74KVt1WHq7Ax2FvxGtWp6nQEG+y6Tbr2Xw/Luega3nlnU7QoHLN4QcDQXE/xChYP3VlYFYLDfPihNiZww2BnsJXhdhQO2DxtgsI/gtdWq33YGuwheXa2aFWkStskyBucX/KQvkcMED8yDc2dRAxeIsK2aLpMiDM68DwoskcMWdfQMziv4BiyRw6pbAwzOKXi8WjWysE5vX0bBG0rkAAvrNHDOl0U1VTgYPmYG5xK8rVo1EzzA4DzLpNYSOcjmptlB8PYKB/sIBqfPokZUq25udgYnF3xMiZzAKuACDE68TBpZIodiG2Bw4ixqZLVqJniAwUkFH13hAHmD5NRnC7I2vzyq+BO9ncHJBJ+kWvVsX5NLlUVNU60aeYOEVlxKk0VNVSKHv0GiZnCSfVDpqlWzt/j0DE4g+IQlchrgLT7gfc2EqTgrNFqAwbFB1qNPWeEA2Zs2pxR86mrVTPAAg6OCrOQlcliQBcyDIwSfvlp1oIJHGGwOsrLUWJs/ZgYbBZ+pWjW7OgCDbYLPVa2aCR5gsEXw+T53QENAgMEWweerVs2GLMBgPMhaqFadLHZmMATmwajg81arZqVS9AwGx0XeatWsHhTCYEjw2YuNMsEDDAYuKUvFtclL5DDBA/si1IJ3qVa9/5gZrBW8S7VqVi4CYbAyyHL63MHU2efBKsG7Vat+tGYGa+YYftWqWZAFMHhb8I7Vqvm3kgEGbwnet1r1ak3g7RG/8dx6V6se7AwWBe9erXq5JrDuIgt3r8DnDt4RDF6/eyWqVe/tDF67ymWqVR9vdgav3L1C1arZ0gvA4MW7V6xaNZsRjfvVpqj2cS5WrTq8PubGBV/ycwebBaeFRkeN14fjlNNUfSPLpJpt1TnbbL8lP8tF5P3yqEHwQPveB+X64ThdFhUYXH+DrFMFnztYLTi93f5kUdXbqnO2tYLTmvZb8NOhlEBkwQPtP8FD26pdBa9v/wr+WFQgyQQ/7V4taV2xF7F/Cb41ts/tH8Ubdi/WiIhEAAAAAElFTkSuQmCC" // Set a unique canvas image
  },
  {
    title: "X / Twitter Bot",
    description: `Engineered with Python Playwright library, Twitter Bot is equipped to handle tasks like
                  logging in, posting multimedia content, and following or
                  unfollowing users. Designed for long-term operations, it runs in an infinite loop, ensuring
                  consistent and reliable automation.`,
    link: "https://github.com/Kianmhz/X-bot",
    alt: "X logo",
    canvasImage: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAADICAMAAACahl6sAAAASFBMVEVHcEz///////////////////////////////////////////////////////////////////////////////////////////8FevL4AAAAF3RSTlMAbAPOEwlO++If8zWj7Ye/tClg2JZ8QDFfUecAAAhKSURBVHjazZ3teqM4DEYTJwTyAYEkJPd/pzu7z+xMKoHQK9uy/be0xWDOsWQjdrePuT3PO+/WsNM9TL9/NB3sPXkF536EuSWn0L3//PB0MXfk8nDuyIOea/91BmGIGFyTaz9OPfn/7f77x8e7vSe3xrEf7472YwjyAUDb+z0f/Gl+0cu4b80d6a5eHTmzgTMeaV+b0X5L7keffhzZOd4X6D897T0ZfATy0oHmYR9c/cnjARkEgfw48GW/JQcHwbOnePXynWsWfGACuezVsunWG7067cNdILNw7QZy6Hm1Dc6Cvz43BSIIXhAEnwqMjatAbjLyr52sm9Uj8wpeJxAJDTMCkXeBCGSVDeR3BEHwv55L8M1gmRQRwQuC4BO4IQ+D9QKRAhdhks7CsUsWwbNIShnLEcELguDhWA7BnyCBCIKHGJw+yOICGdT/492bGZxc8PxBBK5VmD9mBicOss5jFBqJfyAGjykZfMQFIg6Z9Wc4sBlzOyec8fJI6hqHboTB6QS/kIqD+U6GDMTgZIK3CkQSPMTgREHWRipO/WcuZgYnEXzg02vbDIg+aAPA4BRBVpRApFgGYnC84BWpOH2U3GvnUZzBsUEWF8g9Yho3ay9zoAxuIwXfxAtEEDzE4CjBi2s5pplnZ2dwjOD3yQMdkkVFGBwheCQVZ4z6EQabgyy+VDPHG5bwCGFwaxT8hKXi1BnXi5nBtmVSJpA2TWBAeYTMgy2CN6TilB0hPIIYjAueC+SQLKdMBI8wGBY8vxZdwvTl/DEzGBR8MKbitLd7tDMYe1CTRFISEDv7PBgQfHibU3FGwSMMBsbGNYtARJYgDFYLnq9g3tJn98k/gRisFHw2gYgXGmGw6oENzS2fQKQLjTBYI3h+I5+ZNrjQC40wWCH4OatApMk1xOBNwecWiHShIQZf0VTcnK8f7EIjDJazqAtrOTk3hAQS8QjxJ390pTNLl4ozToUgBp9cUnHGLCrC4NVHamEtJ/+WKfoUIwxeEXziVJwxUQPlIh4uqThtGz5mBneTRiC908Zu+hQjDF7YB5VoLSdBFrUFGMwt9+5cBSI+xQiD6fBXbKt2FDzC4J+CLyAQMaWJMPh75DhFUnrBXwAGfx2r3VbtKHiEwX+OVW+r9hQ8wuD/j2VrOS670uUsaivBf1gUfMiwlpMiiwox+LpDt1XnFPxoZ/CvYx1ScUbBIwxu5+nukIozCh5gcNsfSgtEOj2EwT6pOK1Mzk87g0u9a6Y6PYTB5QXyfUvoNB3aF1HwFdnt9Af0jkZpgQiCF6Oi1dc1h2ZXQZs/5nlweYH8OL0xksHjeVdHo2MfZHBRgZAgq41g8PNaTT/Y2JcYPHq/uhgVZN31DG5foaae0LEPMPhS1S2hghdmHOFWOt0AZVERBt+amnpCBQ8wuN3X1BE69hEGd9eanhIqeITB92NNt4RmUQEGO5WLMAoeYXDpuIqMrpf67Ng8+HCuqScUrAiD6xY8wuCqBE/BijC4bsEjDB7rEnxnnwdXLXiIwe+K+sG2JV6AeXDdgkcYPFTF4AfA4N6jXEQqwSMMrlvwCINfVQdZCIPriuBn/UNMp8xdXYIf7fngugRPRwzA4Ky7feMFDzC4KsFDmZKhYsHzzQAIg+sR/FLpYIDB1Qj+vLjsCTC4kiDruLzChuyLqCKL2rzwwpqMwRUInm+rtjC4gizqY32rBsLgsTSD2a44K4MLC36jGDXA4LKC36w9DzC45P4tLpD70z4PLpdFXdpWTSddAIOLCX5xWzV7XQFgcCHBr7yXQ4eb9I7GXMUy6dq26ndvZnCJLKqwrXq2M7iA4IVt1c1oZ7C74KVt1WHq7Ax2FvxGtWp6nQEG+y6Tbr2Xw/Luega3nlnU7QoHLN4QcDQXE/xChYP3VlYFYLDfPihNiZww2BnsJXhdhQO2DxtgsI/gtdWq33YGuwheXa2aFWkStskyBucX/KQvkcMED8yDc2dRAxeIsK2aLpMiDM68DwoskcMWdfQMziv4BiyRw6pbAwzOKXi8WjWysE5vX0bBG0rkAAvrNHDOl0U1VTgYPmYG5xK8rVo1EzzA4DzLpNYSOcjmptlB8PYKB/sIBqfPokZUq25udgYnF3xMiZzAKuACDE68TBpZIodiG2Bw4ixqZLVqJniAwUkFH13hAHmD5NRnC7I2vzyq+BO9ncHJBJ+kWvVsX5NLlUVNU60aeYOEVlxKk0VNVSKHv0GiZnCSfVDpqlWzt/j0DE4g+IQlchrgLT7gfc2EqTgrNFqAwbFB1qNPWeEA2Zs2pxR86mrVTPAAg6OCrOQlcliQBcyDIwSfvlp1oIJHGGwOsrLUWJs/ZgYbBZ+pWjW7OgCDbYLPVa2aCR5gsEXw+T53QENAgMEWweerVs2GLMBgPMhaqFadLHZmMATmwajg81arZqVS9AwGx0XeatWsHhTCYEjw2YuNMsEDDAYuKUvFtclL5DDBA/si1IJ3qVa9/5gZrBW8S7VqVi4CYbAyyHL63MHU2efBKsG7Vat+tGYGa+YYftWqWZAFMHhb8I7Vqvm3kgEGbwnet1r1ak3g7RG/8dx6V6se7AwWBe9erXq5JrDuIgt3r8DnDt4RDF6/eyWqVe/tDF67ymWqVR9vdgav3L1C1arZ0gvA4MW7V6xaNZsRjfvVpqj2cS5WrTq8PubGBV/ycwebBaeFRkeN14fjlNNUfSPLpJpt1TnbbL8lP8tF5P3yqEHwQPveB+X64ThdFhUYXH+DrFMFnztYLTi93f5kUdXbqnO2tYLTmvZb8NOhlEBkwQPtP8FD26pdBa9v/wr+WFQgyQQ/7V4taV2xF7F/Cb41ts/tH8Ubdi/WiIhEAAAAAElFTkSuQmCC" // Set a unique canvas image
  }
]);

let worker;

// Check if we're in a browser environment
if (typeof window !== "undefined") {
  worker = new Worker(new URL("./particleWorker.js", import.meta.url), { type: "module" });
}

// Keep track of initialized canvases
const initializedCanvases = {};

const initOffscreenCanvas = (canvasId, canvasImageSrc) => {
  if (!worker) return; // If the worker is not defined, exit

  const canvas = document.getElementById(canvasId);
  if (!canvas || initializedCanvases[canvasId]) return;

  const offscreen = canvas.transferControlToOffscreen();
  worker.postMessage({ canvas: offscreen, imageSrc: canvasImageSrc }, [offscreen]);

  initializedCanvases[canvasId] = true;
};

// Initialize canvases for the current, next, and previous slides
const initializeCanvases = (activeIndex) => {
  nextTick(() => {
    // Initialize current slide
    initOffscreenCanvas(`canvas-${activeIndex}`, projects.value[activeIndex].canvasImage);

    // Preload next slide if available
    if (projects.value[activeIndex + 1]) {
      initOffscreenCanvas(`canvas-${activeIndex + 1}`, projects.value[activeIndex + 1].canvasImage);
    }

    // Preload previous slide if available
    if (projects.value[activeIndex - 1]) {
      initOffscreenCanvas(`canvas-${activeIndex - 1}`, projects.value[activeIndex - 1].canvasImage);
    }
  });
};

// Initialize the first slide on mount
onMounted(() => {
  initializeCanvases(0);
});
</script>

<template>
  <Swiper
    :pagination="{ dynamicBullets: true }"
    :slidesPerView="1"
    :loop="true"
    :autoplay="{ delay: 6000, disableOnInteraction: false }"
    :speed="500"
    @slideChangeTransitionEnd="({ activeIndex }) => initializeCanvases(activeIndex)"
  >
    <SwiperSlide v-for="(project, index) in projects" :key="index">
      <div class="my-20">
        <UContainer>
          <div class="grid grid-cols-1 justify-center items-center gap-10 sm:gap-20 text-center sm:grid-cols-2 sm:text-left">
            <div>
              <h1 class="text-3xl sm:text-4xl font-bold">{{ project.title }}</h1>
              <p class="text-md sm:text-lg my-5 text-[--secondary-text-color]">{{ project.description }}</p>
              <BaseButton icon="codicon:github" title="GitHub" :link="project.link" />
            </div>
            <div class="ml-auto">
              <canvas :id="`canvas-${index}`" width="400" height="400"></canvas>
            </div>
          </div>
        </UContainer>
      </div>
    </SwiperSlide>
  </Swiper>
</template>
import styled from "styled-components";
import Link from "next/link";
import Image from "next/legacy/image";

import "../public/logo.png";

const Layout = ({children}) => {
  return (
    <>
      <Navbar>
        <Logo src="/logo.png" alt="kidsFi logo" width={80} height={80} />
        <StyledList>
          <Link href="">
            <svg
              width="3.5rem"
              height="3.5rem"
              viewBox="0 0 38 39"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M32.108 12.4486C31.7158 11.9945 31.5 11.4145 31.5 10.8145V2.92857C31.5 1.54786 30.3807 0.428571 29 0.428571H26.7312C25.9131 0.428571 25.25 1.09171 25.25 1.90973V1.90973C25.25 3.2514 23.6088 3.90179 22.6898 2.92432L20.8281 0.944288C19.8383 -0.108364 18.1649 -0.105291 17.1791 0.95099L1.37816 17.8805C0.474545 18.8487 1.16108 20.4286 2.48541 20.4286V20.4286C3.32189 20.4286 4 21.1067 4 21.9432V36.5C4 37.8807 5.11929 39 6.5 39H12.75C14.1307 39 15.25 37.8807 15.25 36.5V27.2143C15.25 25.8336 16.3693 24.7143 17.75 24.7143H20.25C21.6307 24.7143 22.75 25.8336 22.75 27.2143V36.5C22.75 37.8807 23.8693 39 25.25 39H31.5C32.8807 39 34 37.8807 34 36.5V21.9984C34 21.1314 34.7029 20.4286 35.5699 20.4286V20.4286C36.9138 20.4286 37.6364 18.8497 36.758 17.8326L32.108 12.4486Z"
                fill="#224024"
              />
            </svg>
          </Link>
          <Link href="">
            <svg
              width="4rem"
              height="4rem"
              viewBox="0 0 48 48"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M20.8 4C18.8925 4.00703 17.0651 4.80007 15.7163 6.20614C14.3675 7.6122 13.6067 9.51722 13.6 11.5057C13.6 12.84 13.9632 14.0793 14.5504 15.1551C11.6688 16.9131 9.4128 19.4083 8.2 22.3472H8C7.89428 22.3498 7.78918 22.3299 7.69103 22.2889C7.59288 22.2479 7.50373 22.1865 7.42896 22.1086C7.35419 22.0306 7.29535 21.9377 7.25599 21.8354C7.21664 21.7331 7.19759 21.6235 7.2 21.5133C7.2 21.2197 7.344 20.9862 7.5504 20.8361L5.6992 18.1257C5.17497 18.5057 4.74666 19.0122 4.45079 19.6021C4.15492 20.192 4.00026 20.8476 4 21.5133C4 23.5648 5.4688 25.2461 7.3504 25.5797C7.2688 26.1635 7.2 26.7456 7.2 27.351C7.2 31.5075 9.3184 35.1103 12.4 37.7756C12.0128 39.4435 12.2064 41.2216 13.4496 42.5192C14.3674 43.4678 15.6076 44 16.9 44C18.1924 44 19.4326 43.4678 20.3504 42.5192L20.9504 41.8937C22.2 42.1339 23.456 42.3624 24.8 42.3624C26.144 42.3624 27.4 42.1339 28.6496 41.8937L29.2496 42.5192C30.1674 43.4678 31.4076 44 32.7 44C33.9924 44 35.2326 43.4678 36.1504 42.5192C37.368 41.2482 37.5504 39.5219 37.2 37.879C38.483 36.7927 39.5816 35.4891 40.4496 34.0228H44V20.6793H40.3504C39.7694 19.6962 39.0811 18.7867 38.2992 17.9689L39.2 12.8083V10.6717H37.6C37.6 10.6717 33.7568 10.7384 30.4992 13.2787C29.6439 13.0215 28.776 12.8121 27.8992 12.6516C27.9632 12.2813 28 11.896 28 11.5057C28 7.3809 24.7568 4 20.8 4ZM20.8 7.33586C23.024 7.33586 24.8 9.18727 24.8 11.5057C24.8 11.7926 24.7504 12.0661 24.6992 12.3397C22.1184 12.353 19.6816 12.8734 17.4512 13.7474C17.0264 13.0837 16.7998 12.3036 16.8 11.5057C16.8 9.18727 18.576 7.33586 20.8 7.33586ZM35.6 14.3212C35.6256 14.3145 35.6256 14.3262 35.6496 14.3212L35.0496 18.124L34.9008 19.0114L35.6 19.6369C36.6684 20.6014 37.5507 21.7691 38.2 23.0778L38.6496 24.0152H40.8V30.6869H38.6496L38.2 31.6259C37.4192 33.2338 36.1872 34.6482 34.6 35.8458L33.4496 36.7331L34.1504 38.0892C34.5312 38.7597 34.4624 39.587 33.8992 40.1741C33.7473 40.3392 33.565 40.4705 33.3632 40.5603C33.1614 40.65 32.9442 40.6963 32.7248 40.6963C32.5054 40.6963 32.2882 40.65 32.0864 40.5603C31.8846 40.4705 31.7023 40.3392 31.5504 40.1741L30.4 38.9732L29.7504 38.3494L28.8992 38.5579C27.6 38.8698 26.2192 39.0266 24.8 39.0266C23.4205 39.0318 22.0448 38.8745 20.6992 38.5579L19.8512 38.3494L19.2 38.9748L18.0496 40.1724C17.8977 40.3378 17.7153 40.4693 17.5133 40.5592C17.3113 40.6491 17.094 40.6955 16.8744 40.6955C16.6548 40.6955 16.4375 40.6491 16.2355 40.5592C16.0335 40.4693 15.8511 40.3378 15.6992 40.1724C15.4359 39.9066 15.2676 39.555 15.2222 39.1758C15.1768 38.7966 15.257 38.4126 15.4496 38.0875L16.1504 36.7331L15 35.8475C12.1056 33.6558 10.4 30.6669 10.4 27.351C10.4 21.1096 16.656 15.6755 24.8 15.6755C26.768 15.6755 28.6432 15.9824 30.3504 16.5612L31.2 16.8748L31.9008 16.2493C33.0432 15.1868 34.456 14.6147 35.6 14.3212ZM34.4 24.0152C33.52 24.0152 32.8 24.7657 32.8 25.6831C32.8 26.6005 33.52 27.351 34.4 27.351C35.28 27.351 36 26.6005 36 25.6831C36 24.7657 35.28 24.0152 34.4 24.0152Z"
                fill="#E9F2EF"
              />
            </svg>
          </Link>
          <Link href="">
            <svg
              width="4rem"
              height="4rem"
              viewBox="0 0 48 48"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M24 4C21.3736 4 18.7728 4.51732 16.3463 5.52241C13.9198 6.5275 11.715 8.00069 9.85786 9.85786C6.10714 13.6086 4 18.6957 4 24C4 29.3043 6.10714 34.3914 9.85786 38.1421C11.715 39.9993 13.9198 41.4725 16.3463 42.4776C18.7728 43.4827 21.3736 44 24 44C29.3043 44 34.3914 41.8929 38.1421 38.1421C41.8929 34.3914 44 29.3043 44 24C44 21.3736 43.4827 18.7728 42.4776 16.3463C41.4725 13.9198 39.9993 11.715 38.1421 9.85786C36.285 8.00069 34.0802 6.5275 31.6537 5.52241C29.2272 4.51732 26.6264 4 24 4M24 16.78C27.227 18.8766 30.9917 19.9949 34.84 20C36.4 20 37.9 19.82 39.34 19.48C39.76 20.9 40 22.42 40 24C40 32.82 32.82 40 24 40C18 40 12.78 36.68 10 31.78L13.5 28V26C13.5 25.337 13.7634 24.7011 14.2322 24.2322C14.7011 23.7634 15.337 23.5 16 23.5C16.663 23.5 17.2989 23.7634 17.7678 24.2322C18.2366 24.7011 18.5 25.337 18.5 26V28H24M32 23.5C31.337 23.5 30.7011 23.7634 30.2322 24.2322C29.7634 24.7011 29.5 25.337 29.5 26C29.5 26.663 29.7634 27.2989 30.2322 27.7678C30.7011 28.2366 31.337 28.5 32 28.5C32.663 28.5 33.2989 28.2366 33.7678 27.7678C34.2366 27.2989 34.5 26.663 34.5 26C34.5 25.337 34.2366 24.7011 33.7678 24.2322C33.2989 23.7634 32.663 23.5 32 23.5Z"
                fill="#E9F2EF"
              />
            </svg>
          </Link>
        </StyledList>
      </Navbar>
      {children}
    </>
  );
};

export default Layout;

const Navbar = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 5rem;
  background: #688b51;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 2rem;
`;

const Logo = styled(Image)`
  width: 5rem;
  height: 5rem;
  flex-grow: 1;
`;

const StyledList = styled.ul`
  margin-left: auto;
  list-style: none;
  display: flex;
  align-items: center;
  gap: 3rem;
  padding-right: 2rem;
`;

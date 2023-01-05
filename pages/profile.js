import Head from "next/head";
import {useContext} from "react";
import Layout from "../components/Layout";
import {StyledParagraph, LogoutButton} from "../components/StyledComponents";
import {UserContext} from "../components/contexts/UserContext";
import {PageContext} from "../components/contexts/PageContext";
import Link from "next/link";
import {useLocalStorage} from "../hooks/useLocalStorage";

export default function Profile() {
  const {user, setUser} = useContext(UserContext);
  const {handleClickLink} = useContext(PageContext);
  const [currentAmountPB] = useLocalStorage("piggyBankAmount", 0);
  const [currentAmountSA] = useLocalStorage("savingsAmount", 0);

  return (
    <>
      <Head>
        <title>kidsFi - Finance for kids</title>
      </Head>
      <Layout />

      {user?.isParent ? (
        <>
          <StyledParagraph>
            Name: {user.firstName} {user.lastName}
          </StyledParagraph>
          <StyledParagraph>Username: {user.username}</StyledParagraph>
          <StyledParagraph>Children</StyledParagraph>
          {user && user.children.length === 0 ? (
            <StyledParagraph>
              You don&apos;t have any children logins yet{" "}
            </StyledParagraph>
          ) : (
            <>
              {user.children.map(child => (
                <>
                  <StyledParagraph key={child._id}>
                    Name: {child.firstName} {child.lastName}
                  </StyledParagraph>
                </>
              ))}
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <Link
                  href="/"
                  onClick={() => {
                    handleClickLink("home");
                    setUser(null);
                  }}
                >
                  <LogoutButton style={{margin: "0 auto"}}>Logout</LogoutButton>
                </Link>
              </div>
            </>
          )}
        </>
      ) : user?.isChild ? (
        <>
          <StyledParagraph>
            Name: {user.firstName} {user.lastName}
          </StyledParagraph>
          <StyledParagraph>Username: {user.username}</StyledParagraph>
          <StyledParagraph>Accounts:</StyledParagraph>
          {user.accounts.map(account =>
            account.name === "Piggy bank" ? (
              <StyledParagraph key={account._id}>
                {account.name}: {currentAmountPB} {` €`}
              </StyledParagraph>
            ) : (
              <p>
                <StyledParagraph key={account._id}>
                  {account.name}: {currentAmountSA.toFixed(2)} {` €`}
                </StyledParagraph>
              </p>
            )
          )}
          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Link
              href="/"
              onClick={() => {
                handleClickLink("home");
                setUser(null);
              }}
            >
              <LogoutButton style={{margin: "0 auto"}}>Logout</LogoutButton>
            </Link>
          </div>
        </>
      ) : (
        <StyledParagraph>
          This section is available once you are logged in.
        </StyledParagraph>
      )}
    </>
  );
}

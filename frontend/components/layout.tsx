import React from "react"
import NavBar from './navbar';
import Footer from './footer';

type Props = {
    children: React.ReactNode
}

const Layout: React.VFC<Props> = ({ children }) => {
    return (
      <>
        <NavBar />
            <main>{children}</main>
        <Footer />
      </>
    )
  }
  
export default Layout;
import styled from 'styled-components'

const CenteredText = styled.div`
    font-size:90px;
    font-family:'Roboto';
    text-align:center;
    color:#fff;
    width:100%;
    position: absolute;
    top: 40%;
    transform: translateY(-40%);
    word-break: break-all;
`;

const ChatStyled = styled.div`
    height: 440px;
    width: 100%;
    overflow: auto;
    float: left;
    position: relative;
    word-break: break-all;
    margin-left: -5px;
`;

const SingleUser = styled.div`
    padding:10px 8px;
    cursor: pointer;
    border-bottom:1px solid #bbb;
`;
export { CenteredText, ChatStyled, SingleUser };
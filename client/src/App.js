import './style/App.scss';
import './style/sessionLink.scss'
import Sandbox from './components/Sandbox';
import { useEffect, useRef, useState } from 'react';
import { socket, } from './api'
import { extendTheme } from "@chakra-ui/react"
import { nanoid } from 'nanoid';
import {
  BrowserRouter as Router,
  Switch, Route, Link
} from 'react-router-dom';
import {
  Button,
  ChakraProvider,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  useDisclosure,
  InputGroup,
  Input,
  Text,
  Grid,
  GridItem,
} from "@chakra-ui/react"


function App () {
  const [roomId, setRoomId] = useState();
  const [copySuccess, setCopySuccess] = useState('');

  useEffect(() => {
    return () => {
      socket.disconnect();
      return socket.emit('leave-room', roomId);
    }
  }, [])

  const textAreaRef = useRef(null);
  const initialRef = useRef();
  const { isOpen, onOpen, onClose } = useDisclosure()
  const newId = nanoid(10);
  const newIdHyphenated = `${newId.substring(0, 3)}-${newId.substring(3, 7)}-${newId.substring(7, 10)}`

  useEffect(() => {
    onOpen()
  }, []);

  function copyToClipboard () {
    textAreaRef.current.select();
    document.execCommand('copy');
    setCopySuccess('Copied!');
  };

  const theme = extendTheme({
    styles: {
      global: {
        body: {
          bg: '#505050',
        },
      },
    },
  });

  return (
    <ChakraProvider theme={theme}>
      <Router>
          <Modal initialFocusRef={initialRef} w="800px"  onClose={onClose} size={'3xl'} isOpen={isOpen}>
            <ModalOverlay />
            <ModalContent fontFamily="Comfortaa" bg={'#C8C8C8'}>
              <ModalHeader fontSize="6xl">How would you like to drooom?</ModalHeader>
              <ModalBody color={''}>
                <Grid templateColumns="repeat(2, 1fr)" templateRows="60% 30%" gap={4}>
                  <GridItem spacing="5" p="5">
                    <Text fontSize="30px">
                      You can start a new drooom room
                    </Text>
                  </GridItem>
                  <GridItem spacing="5" p="5">
                    <Text fontSize="30px">
                      or if someone shared a key with you, enter it below.
                    </Text>
                    <InputGroup mb="5" size="sm">
                      <Input placeholder="your code" />
                    </InputGroup>
                  </GridItem>
                  <GridItem spacing="5" p="5">
                    <Button mr={10} onClick={onClose}>
                      <Link to={`/room/${newIdHyphenated}`}>Start new</Link>
                    </Button>
                  </GridItem>
                  <GridItem spacing="5" p="5">
                    <Button className="session-link-btn" onClick={copyToClipboard} >
                      Use code
                    </Button>
                  </GridItem>
                </Grid>
              </ModalBody>
            </ModalContent>
          </Modal>
        <Switch>
          <Route path="/room/:roomId">
            <Sandbox />
          </Route>
        </Switch>
      </Router>
    </ChakraProvider>
  );
}

export default App;

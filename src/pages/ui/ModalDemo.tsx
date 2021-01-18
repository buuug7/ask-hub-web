import Modal from "../../components/Modal";
import {useState} from "react";

export default function ModalDemo() {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="ModalDemo">
      <a
        href="#12"
        onClick={(e) => {
          e.preventDefault();
          setShowModal(true);
        }}
      >
        open modal
      </a>
      {showModal && (
        <Modal
          title="Lorem ipsum Dolor Sit"
          custom={false}
          close={() => {
            setShowModal(false);
          }}
        >
          <div>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam aliquid architecto
              cumque delectus doloribus facilis illum impedit in iste laborum laudantium magnam
              maxime, necessitatibus nobis optio praesentium reiciendis, velit vero!
            </p>
            <p>
              Aspernatur eligendi eos error eveniet impedit, ipsum maiores minus mollitia nam nulla
              rerum temporibus voluptate. Adipisci architecto, consectetur cumque ea facilis fugiat
              incidunt minima, molestiae optio praesentium rerum suscipit voluptatem.
            </p>
            <p>
              Aliquam deleniti dolorum ipsam libero nobis, odit placeat saepe! Doloremque eum facere
              fuga ipsam labore magnam, nemo. Ab, amet corporis cum debitis est laborum, modi nobis
              qui sapiente, vel voluptatibus.
            </p>

            <div>
              <button className="btn primary">Submit</button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}

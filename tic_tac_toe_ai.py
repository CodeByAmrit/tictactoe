import numpy as np

# import tensorflow as tf
from keras_core.layers import Dense
from keras_core.optimizers import Adam
from keras_core.models import Sequential
import random
import sys
import json


class TicTacToeAI:
    def __init__(self):
        self.model = self._build_model()
        self.epsilon = 1.0  # Exploration rate
        self.gamma = 0.95  # Discount rate
        self.learning_rate = 0.001

    def _build_model(self):
        model = Sequential()
        model.add(Dense(24, input_dim=9, activation="relu"))
        model.add(Dense(24, activation="relu"))
        model.add(Dense(9, activation="linear"))
        model.compile(loss="mse", optimizer=Adam(lr=self.learning_rate))
        return model

    def train(self, state, action, reward, next_state, done):
        target = reward
        if not done:
            target = reward + self.gamma * np.amax(self.model.predict(next_state)[0])
        target_f = self.model.predict(state)
        target_f[0][action] = target
        self.model.fit(state, target_f, epochs=1, verbose=0)

    def act(self, state):
        if np.random.rand() <= self.epsilon:
            return random.randrange(9)
        act_values = self.model.predict(state)
        return np.argmax(act_values[0])

    def load(self, name):
        self.model.load_weights(name)

    def save(self, name):
        self.model.save_weights(name)


# Function to convert board to state
def board_to_state(board):
    return np.reshape(board, [1, 9])


# Read input from Node.js server
if __name__ == "__main__":
    board = json.loads(sys.stdin.read())
    state = board_to_state(board)
    ai = TicTacToeAI()
    action = ai.act(state)
    print(json.dumps(action))

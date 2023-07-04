// import { userService } from '../../services/user.service'

// export function spendBalance(amount) {
//   console.log('amount:', amount)
//   return async (dispatch, getState) => {
//     try {
//       const user = userService.getUser()
//       user.coins = user.coins - amount
//       userService.update(user)
//       dispatch({ type: 'SPEND_BALANCE', amount })
//     } catch (error) {
//       console.log('error:', error)
//     }
//   }
// }

// export function transferCoins(amount, contact) {
//   return async (dispatch, getState) => {
//     try {
//       const updatedUser = userService.transferCoins(amount, contact)
//       dispatch({ type: 'SET_USER', user: updatedUser })
//     } catch (error) {
//       console.log('error:', error)
//     }
//   }
// }

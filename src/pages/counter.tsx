import type { GetServerSideProps, NextPage } from 'next'
import { fork, allSettled, serialize } from 'effector'
import { counterModel } from '~/entities/counter'

export const getServerSideProps: GetServerSideProps = async () => {
  const scope = fork()

  await allSettled(counterModel.increment, { scope })

  const serialized = serialize(scope)

  return {
    props: {
      initialState: serialized,
    },
  }
}

const CounterPage: NextPage = () => {
  return <div>Counter</div>
}

export default CounterPage

export default function UserCard() {
    return (
        <div className="space-y-4">
            <div className="flex justify-between items-center border rounded-md p-4 hover:shadow-md transition">
              <div>
                <div className="font-semibold">Rahayuningtyas</div>
                <div className="text-sm text-gray-600">
                  Rahayuningtyas@gmail.com
                </div>
                <div className="mt-2 flex gap-2">
                  <span className="bg-gray-800 text-white text-xs px-2 py-1 rounded">
                    admin
                  </span>
                </div>
              </div>
              <div className={`font-semibold text-black`}>aktif</div>
            </div>
          </div>

    )
}
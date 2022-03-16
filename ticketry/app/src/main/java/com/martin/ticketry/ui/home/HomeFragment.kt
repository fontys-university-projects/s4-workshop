package com.martin.ticketry.ui.home

import android.content.ContentValues
import android.graphics.Bitmap
import android.graphics.Color
import android.os.Bundle
import android.os.CountDownTimer
import android.util.Log
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.Button
import android.widget.ImageView
import android.widget.TextView
import androidx.fragment.app.Fragment
import androidx.lifecycle.ViewModelProvider
import com.martin.ticketry.databinding.FragmentHomeBinding
import kotlinx.android.synthetic.main.fragment_home.*
import com.google.zxing.BarcodeFormat
import com.google.zxing.MultiFormatWriter
import com.google.zxing.WriterException
import com.martin.ticketry.R

class HomeFragment : Fragment() {

    private var _binding: FragmentHomeBinding? = null

    // This property is only valid between onCreateView and
    // onDestroyView.
    private val binding get() = _binding!!

    override fun onCreateView(
        inflater: LayoutInflater,
        container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View {
        val homeViewModel =
            ViewModelProvider(this)[HomeViewModel::class.java]

        _binding = FragmentHomeBinding.inflate(inflater, container, false)

//        val textView: TextView = binding.textHome
//        homeViewModel.text.observe(viewLifecycleOwner) {
//            textView.text = it
//        }
        return binding.root
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)

        val genQR: Button = view.findViewById(R.id.ticketButton)
        val qrImage: ImageView = view.findViewById(R.id.qrImage)
        val countdownText: TextView = view.findViewById(R.id.countdownText)
        genQR.setOnClickListener {
            genQRCode()

            object : CountDownTimer(15000, 1000) {

                override fun onTick(millisUntilFinished: Long) {
                    countdownText.text = (millisUntilFinished / 1000).toString()
                    genQR.visibility = View.GONE
                    countdownText.visibility = View.VISIBLE
                }

                override fun onFinish() {
                    genQR.visibility = View.VISIBLE
                    qrImage.setImageResource(R.drawable.ic_qr_placement)
                    countdownText.visibility = View.GONE
                }
            }.start()
        }
    }

        private fun getRandomString(length: Int) : String {
        val charset = ('a'..'z') + ('A'..'Z') + ('0'..'9')

        return List(length) { charset.random() }
            .joinToString("")
    }

    private fun genQRCode() {
//        val qrImage: ImageView = findViewById(R.id.qrImage)
        val length = 10
        val randomString = getRandomString(length)
        val bitmap = generateQRCodeImage(randomString)
        qrImage.setImageBitmap(bitmap)
    }

    private fun generateQRCodeImage(text: String): Bitmap {
        val width = 600
        val height = 600
        val bitmap = Bitmap.createBitmap(width, height, Bitmap.Config.ARGB_8888)
        val codeWriter = MultiFormatWriter()
        try {
            val bitMatrix = codeWriter.encode(text, BarcodeFormat.QR_CODE, width, height)
            for (x in 0 until width) {
                for (y in 0 until height) {
                    bitmap.setPixel(x, y, if (bitMatrix[x, y]) Color.BLACK else Color.WHITE)
                }
            }
        } catch (e: WriterException) { Log.d(ContentValues.TAG, "generateQRCode: ${e.message}") }
        return bitmap
    }

    override fun onDestroyView() {
        super.onDestroyView()
        _binding = null
    }
}
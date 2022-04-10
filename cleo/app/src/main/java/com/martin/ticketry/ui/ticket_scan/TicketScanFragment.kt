package com.martin.ticketry.ui.ticket_scan

import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.Button
import android.widget.TextView
import androidx.fragment.app.Fragment
import androidx.lifecycle.ViewModelProvider
import com.google.zxing.integration.android.IntentIntegrator
import com.martin.ticketry.databinding.FragmentTicketScanBinding
import kotlinx.android.synthetic.main.fragment_ticket_scan.*


class TicketScanFragment : Fragment() {

    private var _binding: FragmentTicketScanBinding? = null

    // This property is only valid between onCreateView and
    // onDestroyView.
    private val binding get() = _binding!!

    override fun onCreateView(
        inflater: LayoutInflater,
        container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View {
        val ticketScanViewModel =
            ViewModelProvider(this)[TicketScanViewModel::class.java]

        _binding = FragmentTicketScanBinding.inflate(inflater, container, false)
        val root: View = binding.root

        val textView: TextView = binding.textTicketScan
        ticketScanViewModel.text.observe(viewLifecycleOwner) {
            textView.text = it
        }
        return root
    }


//    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
//        super.onViewCreated(view, savedInstanceState)
//
//        val btnBarcode = barcode_scan_button
//        val textView = barcode_text
//        btnBarcode.setOnClickListener {
//            val intentIntegrator = IntentIntegrator()                        DEPRECATION WARNING, the other option I can do is implement
//            intentIntegrator.setBeepEnabled(false)                           third party, like how other APPS do it, but yeah locally the librabry
//            intentIntegrator.setCameraId(0)                                  is broken until the update it which, they said it will be "soon"
//            intentIntegrator.setPrompt("SCAN")
//            intentIntegrator.setBarcodeImageEnabled(false)
//            intentIntegrator.initiateScan()
//        }
//
//    }

}